import { Injectable } from '@nestjs/common';

import { CommentRepository } from '../infra/comment.repository';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { UniqueIdInput } from '@/@seedwork/dto/unique-id.input';
import NotFoundError from '@/@seedwork/errors/not-found.error';

@Injectable()
export class DeleteComment {
  constructor(private commentRepository: CommentRepository) {}

  async execute(dto: UniqueIdInput) {
    const uniqueId = new UniqueEntityId(dto.id);

    if (!(await this.commentRepository.find(uniqueId.value)))
      throw new NotFoundError('Comment not found');

    return this.commentRepository.delete(dto.id);
  }
}
