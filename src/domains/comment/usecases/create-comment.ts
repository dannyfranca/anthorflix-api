import { Injectable } from '@nestjs/common';

import NotFoundError from '@/@seedwork/errors/not-found.error';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { UserRepository } from '@/domains/user/infra/user.repository';
import { User } from '@/domains/user/entities/user';
import { RatingRepository } from '@/domains/rating/infra/rating.repository';
import RequiredDescription from '@/@seedwork/entities/required-description';
import { CreateCommentInput } from '../dto/create-comment.input';
import { CommentRepository } from '../infra/comment.repository';
import { Comment } from '../entities/comment';

@Injectable()
export class CreateComment {
  constructor(
    private commentRepository: CommentRepository,
    private ratingRepository: RatingRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(dto: CreateCommentInput & { user_id: string }) {
    if (!(await this.ratingRepository.find(dto.rating_id)))
      throw new NotFoundError('Rating does not exist');

    const plainUser = await this.userRepository.find(dto.user_id);
    if (!plainUser) throw new NotFoundError('User does not exist');

    const rating_id = new UniqueEntityId(dto.rating_id);
    const user_id = new UniqueEntityId(plainUser.id);
    const user = new User({ ...plainUser, id: user_id });
    const content = new RequiredDescription(dto.content);
    const comment = new Comment({ content, rating_id, user });
    return this.commentRepository.create(comment.plain);
  }
}
