import { Injectable } from '@nestjs/common';

import { RatingRepository } from '../infra/rating.repository';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { UniqueIdInput } from '@/@seedwork/dto/unique-id.input';
import NotFoundError from '@/@seedwork/errors/not-found.error';

@Injectable()
export class DeleteRating {
  constructor(private ratingRepository: RatingRepository) {}

  async execute(dto: UniqueIdInput) {
    const uniqueId = new UniqueEntityId(dto.id);

    if (!(await this.ratingRepository.find(uniqueId.value)))
      throw new NotFoundError('Rating not found');

    return this.ratingRepository.delete(dto.id);
  }
}
