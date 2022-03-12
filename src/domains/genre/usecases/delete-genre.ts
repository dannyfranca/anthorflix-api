import { Injectable } from '@nestjs/common';

import { GenreRepository } from '../infra/genre.repository';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { UniqueIdInput } from '@/@seedwork/dto/unique-id.input';
import NotFoundError from '@/@seedwork/errors/not-found.error';

@Injectable()
export class DeleteGenre {
  constructor(private genreRepository: GenreRepository) {}

  async execute(dto: UniqueIdInput) {
    const uniqueId = new UniqueEntityId(dto.id);

    if (!(await this.genreRepository.find(uniqueId.value)))
      throw new NotFoundError('Genre not found');

    return this.genreRepository.delete(dto.id);
  }
}
