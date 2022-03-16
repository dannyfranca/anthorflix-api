import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import NotFoundError from '@/@seedwork/errors/not-found.error';
import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../infra/movie.repository';

@Injectable()
export class FindMovie {
  constructor(private movieRepository: MovieRepository) {}

  async execute(id: string) {
    const uniqueId = new UniqueEntityId(id);
    const result = await this.movieRepository.find(uniqueId.value);
    if (!result) throw new NotFoundError('Movie not found');
    return result;
  }
}
