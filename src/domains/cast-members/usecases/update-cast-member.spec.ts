import { now } from '@/@seedwork/utils/date';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { PlainCastMember } from '../entities/cast-member';
import { UpdateCastMember } from './update-cast-member';
import { CastMemberRepository } from '../infra/cast-member.repository';
import { PrismaService } from '@/@seedwork/infra/prisma.service';
import NotFoundError from '@/@seedwork/errors/not-found.error';
import InvalidUuidError from '@/@seedwork/errors/invalid-uuid.error';
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
const newName = 'Another Name';

describe('Update castMember use case', () => {
  let updateCastMember: UpdateCastMember;
  let castMemberRepository: CastMemberRepository;

  beforeEach(async () => {
    castMemberRepository = new CastMemberRepository({} as PrismaService);
    updateCastMember = new UpdateCastMember(castMemberRepository);
    jest.clearAllMocks();
  });

  it('should update', async () => {
    jest
      .spyOn(castMemberRepository, 'find')
      .mockImplementation(async (id) => plainCastMember);
    jest
      .spyOn(castMemberRepository, 'update')
      .mockImplementation(async () => plainCastMember);

    const plainCastMember = makePlainCastMember();

    expect(
      await updateCastMember.execute(
        { id: plainCastMember.id },
        { name: newName },
      ),
    ).toMatchObject(plainCastMember);
  });

  it('should throw NotFoundError', async () => {
    jest
      .spyOn(castMemberRepository, 'find')
      .mockImplementation(async () => null);
    jest
      .spyOn(castMemberRepository, 'update')
      .mockImplementation(async () => makePlainCastMember());

    const uniqueId = new UniqueEntityId();

    expect(() =>
      updateCastMember.execute({ id: uniqueId.value }, { name: newName }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should throw InvalidUuidError', async () => {
    jest
      .spyOn(castMemberRepository, 'find')
      .mockImplementation(async () => makePlainCastMember());
    jest
      .spyOn(castMemberRepository, 'update')
      .mockImplementation(async () => makePlainCastMember());

    expect(() =>
      updateCastMember.execute({ id: 'abc' }, { name: newName }),
    ).rejects.toBeInstanceOf(InvalidUuidError);
  });

  it('should throw InvalidNameError', async () => {
    jest
      .spyOn(castMemberRepository, 'find')
      .mockImplementation(async () => makePlainCastMember());
    jest
      .spyOn(castMemberRepository, 'update')
      .mockImplementation(async () => makePlainCastMember());

    const uniqueId = new UniqueEntityId();

    expect(() =>
      updateCastMember.execute({ id: uniqueId.value }, { name: 'a' }),
    ).rejects.toBeInstanceOf(InvalidNameError);
  });
});
