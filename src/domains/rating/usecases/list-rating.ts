import { Injectable } from '@nestjs/common';
import { RatingRepository } from '../infra/rating.repository';

@Injectable()
export class ListRating {
  constructor(private ratingRepository: RatingRepository) {}

  async execute() {
    return this.ratingRepository.list();
  }
}
