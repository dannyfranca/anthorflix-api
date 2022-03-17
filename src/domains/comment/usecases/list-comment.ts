import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../infra/comment.repository';

@Injectable()
export class ListComment {
  constructor(private commentRepository: CommentRepository) {}

  async execute() {
    return this.commentRepository.list();
  }
}
