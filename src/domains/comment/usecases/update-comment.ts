import { Injectable } from '@nestjs/common';

import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import NotFoundError from '@/@seedwork/errors/not-found.error';
import RequiredDescription from '@/@seedwork/entities/required-description';
import { UserRepository } from '@/domains/user/infra/user.repository';
import { User } from '@/domains/user/entities/user';
import { CommentRepository } from '../infra/comment.repository';
import { Comment } from '../entities/comment';
import {
  UpdateCommentWhereInput,
  UpdateCommentDataInput,
} from '../dto/update-comment.input';
import Username from '@/@seedwork/entities/username';

@Injectable()
export class UpdateComment {
  constructor(
    private commentRepository: CommentRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(where: UpdateCommentWhereInput, data: UpdateCommentDataInput) {
    const uniqueId = new UniqueEntityId(where.id);
    const plainComment = await this.commentRepository.find(uniqueId.value);

    if (!plainComment) throw new NotFoundError('Comment not found');

    const plainUser = await this.userRepository.find(plainComment.user_id);
    if (!plainUser) throw new NotFoundError('User does not exist');

    const content = new RequiredDescription(plainComment.content);

    const username = new Username(plainUser.username);
    const user_id = new UniqueEntityId(plainComment.user_id);
    const comment = new Comment({
      id: uniqueId,
      content,
      rating_id: new UniqueEntityId(plainComment.rating_id),
      user: new User({
        ...plainUser,
        id: user_id,
        username,
      }),
    });

    if (data.content) comment.content.changeDescription(data.content);

    const { id, ...props } = comment.plain;
    return this.commentRepository.update({ id }, { ...props });
  }
}
