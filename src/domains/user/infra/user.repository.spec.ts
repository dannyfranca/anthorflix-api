import { omit } from 'lodash';

import { PrismaTestController } from '@/@seedwork/infra/prisma-test-controller';
import { PlainUser } from '../entities/user';
import { UserRepository } from './user.repository';
import { makeRandomPlainUser } from '../utils';
import { longRunJestTimeout } from '@/@seedwork/config';

describe('UserRepository', () => {
  const prismaTestController = new PrismaTestController();
  let userRepository: UserRepository;

  beforeEach(async () => {
    await prismaTestController.init();
    userRepository = new UserRepository(prismaTestController.prisma);
  }, longRunJestTimeout);

  afterEach(async () => {
    await prismaTestController.destroy();
  });

  it('should create and delete', async () => {
    let newPlainUser: PlainUser;
    const plainUser: PlainUser = makeRandomPlainUser();
    newPlainUser = { ...plainUser };

    expect(await userRepository.find(plainUser.id)).toBeNull();
    expect(await userRepository.create(plainUser)).toMatchObject(plainUser);
    expect(await userRepository.find(plainUser.id)).toMatchObject(plainUser);

    const deletedUser = await userRepository.delete(plainUser.id);
    expect(deletedUser).toMatchObject(omit(newPlainUser, 'deleted_at'));
    expect(deletedUser.deleted_at).toBeInstanceOf(Date);
    expect(await userRepository.find(plainUser.id)).toBeNull();
  });

  it('should create and list two users', async () => {
    const plainUser1 = makeRandomPlainUser();
    const plainUser2 = makeRandomPlainUser();

    await userRepository.create(plainUser1);
    await userRepository.create(plainUser2);

    expect(await userRepository.list()).toStrictEqual([plainUser1, plainUser2]);
  });
});
