import { Module } from '@nestjs/common';

import { UserResolver } from './adapters/user.resolver';
import { UserController } from './adapters/user.controller';
import { CreateUser } from './usecases/create-user';
import { ListUser } from './usecases/list-user';
import { DeleteUser } from './usecases/delete-user';
import { UserRepository } from './infra/user.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserResolver, UserRepository, ListUser, CreateUser, DeleteUser],
})
export class UserModule {}
