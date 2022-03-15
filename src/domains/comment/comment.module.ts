import { Module } from '@nestjs/common';

import { CommentResolver } from './adapters/comment.resolver';
import { CommentController } from './adapters/comment.controller';
import { CommentRepository } from './infra/comment.repository';
import { CreateComment } from './usecases/create-comment';
import { ListComment } from './usecases/list-comment';
import { UpdateComment } from './usecases/update-comment';
import { DeleteComment } from './usecases/delete-comment';
import { UserRepository } from '../user/infra/user.repository';
import { RatingRepository } from '../rating/infra/rating.repository';

@Module({
  imports: [],
  controllers: [CommentController],
  providers: [
    CommentResolver,
    CommentRepository,
    RatingRepository,
    UserRepository,
    ListComment,
    CreateComment,
    UpdateComment,
    DeleteComment,
  ],
})
export class CommentModule {}
