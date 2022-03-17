import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import NotFoundError from '@/@seedwork/errors/not-found.error';
import { Injectable } from '@nestjs/common';
import { GenreRepository } from '../infra/genre.repository';

@Injectable()
export class FindGenre {
  constructor(private genreRepository: GenreRepository) {}

  async execute(id: string) {
    const uniqueId = new UniqueEntityId(id);
    const result = await this.genreRepository.find(uniqueId.value);
    if (!result) throw new NotFoundError('Genre not found');
    return result;
  }
}
