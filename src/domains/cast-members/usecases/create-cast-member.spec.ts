import { now } from '@/@seedwork/utils/date';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { PlainCastMember } from '../entities/cast-member';
import { CreateCastMember } from './create-cast-member';
import { CastMemberRepository } from '../infra/cast-member.repository';
import { PrismaService } from '@/@seedwork/infra/prisma.service';
import InvalidNameError from '@/@seedwork/errors/invalid-name.error';

const makePlainCastMember = (): PlainCastMember => {
  const uniqueId = new UniqueEntityId();
  return {
    id: uniqueId.value,
    name: 'Some Name',
    created_at: now(),
    deleted_at: null,
  };
};

describe('Create castMember use case', () => {
  let createCastMember: CreateCastMember;
  let castMemberRepository: CastMemberRepository;

  beforeEach(async () => {
    castMemberRepository = new CastMemberRepository({} as PrismaService);
    createCastMember = new CreateCastMember(castMemberRepository);
    jest.clearAllMocks();
  });

  it('should create', async () => {
    jest
      .spyOn(castMemberRepository, 'create')
      .mockImplementation(async () => plainCastMember);

    const plainCastMember = makePlainCastMember();

    expect(await createCastMember.execute(plainCastMember)).toMatchObject(
      plainCastMember,
    );
  });

  it('should throw InvalidNameError', () => {
    jest
      .spyOn(castMemberRepository, 'create')
      .mockImplementation(async () => makePlainCastMember());

    expect(() =>
      createCastMember.execute({ name: 'a' }),
    ).rejects.toBeInstanceOf(InvalidNameError);
  });
});
