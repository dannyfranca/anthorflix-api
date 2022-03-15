import InvalidUsernameError from '@/@seedwork/errors/invalid-username.error';
import AlreadyExistsError from '@/@seedwork/errors/already-exists.error';
import { UserRepository } from '@/domains/user/infra/user.repository';
import { makeRandomPlainUser } from '@/domains/user/utils';
import { PlainUser } from '../entities/user';
import { CreateUser } from './create-user';

describe('Create user use case', () => {
  let createUser: CreateUser;
  let userRepository: UserRepository;
  let plainUser: PlainUser;

  beforeEach(async () => {
    userRepository = new UserRepository({} as any);
    createUser = new CreateUser(userRepository);
    plainUser = makeRandomPlainUser();
    jest.clearAllMocks();
  });

  it('should create', async () => {
    jest
      .spyOn(userRepository, 'usernameExists')
      .mockImplementation(async () => false);
    jest
      .spyOn(userRepository, 'create')
      .mockImplementation(async () => plainUser);

    expect(await createUser.execute(plainUser)).toMatchObject(plainUser);
  });

  it('should throw InvalidUsernameError', () => {
    jest
      .spyOn(userRepository, 'usernameExists')
      .mockImplementation(async () => false);
    jest
      .spyOn(userRepository, 'create')
      .mockImplementation(async () => makeRandomPlainUser());

    expect(() => createUser.execute({ username: 'a' })).rejects.toBeInstanceOf(
      InvalidUsernameError,
    );
  });

  it('should throw AlreadyExistsError when username already exists on database', () => {
    jest
      .spyOn(userRepository, 'usernameExists')
      .mockImplementation(async () => true);

    expect(() => createUser.execute({ ...plainUser })).rejects.toBeInstanceOf(
      AlreadyExistsError,
    );
  });
});
