import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseInterceptors } from '@nestjs/common';

import { UniqueIdInput } from '@/@seedwork/dto/unique-id.input';
import { ErrorsInterceptor } from '@/@seedwork/errors/error.interceptor';
import { CreateCastMemberInput } from '../dto/create-cast-member.input';
import { CastMemberObjectType } from '../dto/cast-member.object';
import {
  UpdateCastMemberDataInput,
  UpdateCastMemberWhereInput,
} from '../dto/update-cast-member.input';
import { CreateCastMember } from '../usecases/create-cast-member';
import { DeleteCastMember } from '../usecases/delete-cast-member';
import { ListCastMember } from '../usecases/list-cast-member';
import { UpdateCastMember } from '../usecases/update-cast-member';

@UseInterceptors(ErrorsInterceptor)
@Resolver(() => CastMemberObjectType)
export class CastMemberResolver {
  constructor(
    private readonly listCastMemberUseCase: ListCastMember,
    private readonly createCastMemberUseCase: CreateCastMember,
    private readonly updateCastMemberUseCase: UpdateCastMember,
    private readonly deleteCastMemberUseCase: DeleteCastMember,
  ) {}

  @Query(() => [CastMemberObjectType])
  async listCastMembers() {
    return this.listCastMemberUseCase.execute();
  }

  @Mutation(() => CastMemberObjectType)
  async createCastMember(@Args('data') data: CreateCastMemberInput) {
    return this.createCastMemberUseCase.execute(data);
  }

  @Mutation(() => CastMemberObjectType)
  async updateCastMember(
    @Args('where') where: UpdateCastMemberWhereInput,
    @Args('data') data: UpdateCastMemberDataInput,
  ) {
    return this.updateCastMemberUseCase.execute(where, data);
  }

  @Mutation(() => CastMemberObjectType)
  async deleteCastMember(@Args('data') input: UniqueIdInput) {
    return this.deleteCastMemberUseCase.execute(input);
  }
}
