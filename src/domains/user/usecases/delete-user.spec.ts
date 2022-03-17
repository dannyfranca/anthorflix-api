import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { PrismaService } from '@/@seedwork/infra/prisma.service';
import NotFoundError from '@/@seedwork/errors/not-found.error';
import InvalidUuidError from '@/@seedwork/errors/invalid-uuid.error';
import { DeleteUser } from './delete-user';
import { UserRepository } from '../infra/user.repository';
import { makeRandomPlainUser } from '../utils';

describe('Delete user use case', () => {
  let deleteUser: DeleteUser;
  let userRepository: UserRepository;

  beforeEach(async () => {
    userRepository = new UserRepository({} as PrismaService);
    deleteUser = new DeleteUser(userRepository);
    jest.clearAllMocks();
  });

  it('should delete', async () => {
    jest
      .spyOn(userRepository, 'find')
      .mockImplementation(async (id) => plainUser);
    jest
      .spyOn(userRepository, 'delete')
      .mockImplementation(async () => plainUser);

    const plainUser = makeRandomPlainUser();

    expect(await deleteUser.execute({ id: plainUser.id })).toMatchObject(
      plainUser,
    );
  });

  it('should throw NotFoundError', async () => {
    jest.spyOn(userRepository, 'find').mockImplementation(async () => null);
    jest
      .spyOn(userRepository, 'delete')
      .mockImplementation(async () => makeRandomPlainUser());

    const uniqueId = new UniqueEntityId();

    expect(() =>
      deleteUser.execute({ id: uniqueId.value }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should throw InvalidUuidError', async () => {
    jest.spyOn(userRepository, 'find').mockImplementation(async () => null);
    jest
      .spyOn(userRepository, 'delete')
      .mockImplementation(async () => makeRandomPlainUser());

    expect(() => deleteUser.execute({ id: '' })).rejects.toBeInstanceOf(
      InvalidUuidError,
    );
  });
});
