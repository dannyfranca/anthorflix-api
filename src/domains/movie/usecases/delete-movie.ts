import { Injectable } from '@nestjs/common';

import { MovieRepository } from '../infra/movie.repository';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { UniqueIdInput } from '@/@seedwork/dto/unique-id.input';
import NotFoundError from '@/@seedwork/errors/not-found.error';

@Injectable()
export class DeleteMovie {
  constructor(private movieRepository: MovieRepository) {}

  async execute(dto: UniqueIdInput) {
    const uniqueId = new UniqueEntityId(dto.id);

    if (!(await this.movieRepository.find(uniqueId)))
      throw new NotFoundError('Movie not found');

    await this.movieRepository.delete(uniqueId);
  }
}
