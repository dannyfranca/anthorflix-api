import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseInterceptors } from '@nestjs/common';

import { UniqueIdInput } from '@/@seedwork/dto/unique-id.input';
import { ErrorsInterceptor } from '@/@seedwork/errors/error.interceptor';
import { CreateCommentInput } from '../dto/create-comment.input';
import { CommentObjectType } from '../dto/comment.object';
import {
  UpdateCommentDataInput,
  UpdateCommentWhereInput,
} from '../dto/update-comment.input';
import { CreateComment } from '../usecases/create-comment';
import { DeleteComment } from '../usecases/delete-comment';
import { ListComment } from '../usecases/list-comment';
import { UpdateComment } from '../usecases/update-comment';

@UseInterceptors(ErrorsInterceptor)
@Resolver(() => CommentObjectType)
export class CommentResolver {
  constructor(
    private readonly listCommentUseCase: ListComment,
    private readonly createCommentUseCase: CreateComment,
    private readonly updateCommentUseCase: UpdateComment,
    private readonly deleteCommentUseCase: DeleteComment,
  ) {}

  @Query(() => [CommentObjectType])
  async listComments() {
    return this.listCommentUseCase.execute();
  }

  @Mutation(() => CommentObjectType)
  async createComment(@Args('data') data: CreateCommentInput, user_id: string) {
    // TODO: user decorator
    return this.createCommentUseCase.execute({ ...data, user_id });
  }

  @Mutation(() => CommentObjectType)
  async updateComment(
    @Args('where') where: UpdateCommentWhereInput,
    @Args('data') data: UpdateCommentDataInput,
  ) {
    return this.updateCommentUseCase.execute(where, data);
  }

  @Mutation(() => CommentObjectType)
  async deleteComment(@Args('data') input: UniqueIdInput) {
    return this.deleteCommentUseCase.execute(input);
  }
}
