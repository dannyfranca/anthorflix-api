import { ListUser } from './list-user';
import { UserRepository } from '../infra/user.repository';
import { makeRandomPlainUser } from '../utils';

describe('List user use case', () => {
  let listUser: ListUser;
  let userRepository: UserRepository;

  beforeEach(async () => {
    userRepository = new UserRepository({} as any);
    listUser = new ListUser(userRepository);
    jest.clearAllMocks();
  });

  it('should list two', async () => {
    jest
      .spyOn(userRepository, 'list')
      .mockImplementation(async () => [plainUser1, plainUser2]);

    const plainUser1 = makeRandomPlainUser();
    const plainUser2 = makeRandomPlainUser();

    const result = await listUser.execute();
    expect(result.length).toBe(2);
    expect(result).toMatchObject([plainUser1, plainUser2]);
  });

  it('should list empty array', async () => {
    jest.spyOn(userRepository, 'list').mockImplementation(async () => []);

    expect(await listUser.execute()).toStrictEqual([]);
  });
});
