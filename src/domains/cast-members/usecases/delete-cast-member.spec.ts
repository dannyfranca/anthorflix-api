import { now } from '@/@seedwork/utils/date';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { PlainCastMember } from '../entities/cast-member';
import { DeleteCastMember } from './delete-cast-member';
import { CastMemberRepository } from '../infra/cast-member.repository';
import { PrismaService } from '@/@seedwork/infra/prisma.service';
import NotFoundError from '@/@seedwork/errors/not-found.error';
import InvalidUuidError from '@/@seedwork/errors/invalid-uuid.error';

const makePlainCastMember = (): PlainCastMember => {
  const uniqueId = new UniqueEntityId();
  return {
    id: uniqueId.value,
    name: 'Some Name',
    created_at: now(),
    deleted_at: null,
  };
};

describe('Delete castMember use case', () => {
  let deleteCastMember: DeleteCastMember;
  let castMemberRepository: CastMemberRepository;

  beforeEach(async () => {
    castMemberRepository = new CastMemberRepository({} as PrismaService);
    deleteCastMember = new DeleteCastMember(castMemberRepository);
    jest.clearAllMocks();
  });

  it('should delete', async () => {
    jest
      .spyOn(castMemberRepository, 'find')
      .mockImplementation(async (id) => plainCastMember);
    jest
      .spyOn(castMemberRepository, 'delete')
      .mockImplementation(async () => plainCastMember);

    const plainCastMember = makePlainCastMember();

    expect(
      await deleteCastMember.execute({ id: plainCastMember.id }),
    ).toMatchObject(plainCastMember);
  });

  it('should throw NotFoundError', async () => {
    jest
      .spyOn(castMemberRepository, 'find')
      .mockImplementation(async () => null);
    jest
      .spyOn(castMemberRepository, 'delete')
      .mockImplementation(async () => makePlainCastMember());

    const uniqueId = new UniqueEntityId();

    expect(() =>
      deleteCastMember.execute({ id: uniqueId.value }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should throw InvalidUuidError', async () => {
    jest
      .spyOn(castMemberRepository, 'find')
      .mockImplementation(async () => null);
    jest
      .spyOn(castMemberRepository, 'delete')
      .mockImplementation(async () => makePlainCastMember());

    expect(() => deleteCastMember.execute({ id: '' })).rejects.toBeInstanceOf(
      InvalidUuidError,
    );
  });
});
