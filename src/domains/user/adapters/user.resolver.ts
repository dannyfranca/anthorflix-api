import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseInterceptors } from '@nestjs/common';

import { UniqueIdInput } from '@/@seedwork/dto/unique-id.input';
import { ErrorsInterceptor } from '@/@seedwork/errors/error.interceptor';
import { CreateUserInput } from '../dto/create-user.input';
import { UserObjectType } from '../dto/user.object';
import { CreateUser } from '../usecases/create-user';
import { DeleteUser } from '../usecases/delete-user';
import { ListUser } from '../usecases/list-user';

@UseInterceptors(ErrorsInterceptor)
@Resolver(() => UserObjectType)
export class UserResolver {
  constructor(
    private readonly listUserUseCase: ListUser,
    private readonly createUserUseCase: CreateUser,
    private readonly deleteUserUseCase: DeleteUser,
  ) {}

  @Query(() => [UserObjectType])
  async listUsers() {
    return this.listUserUseCase.execute();
  }

  @Mutation(() => UserObjectType)
  async createUser(@Args('data') data: CreateUserInput) {
    return this.createUserUseCase.execute(data);
  }

  @Mutation(() => UserObjectType)
  async deleteUser(@Args('data') input: UniqueIdInput) {
    return this.deleteUserUseCase.execute(input);
  }
}
