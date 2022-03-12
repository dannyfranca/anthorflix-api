import { Injectable } from '@nestjs/common';

import { GenreRepository } from '../infra/genre.repository';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { UniqueIdDto } from '@/@seedwork/dto/unique-id.dto';
import NotFoundError from '@/@seedwork/errors/not-found';

@Injectable()
export class DeleteGenre {
  constructor(private genreRepository: GenreRepository) {}

  async execute(dto: UniqueIdDto) {
    const uniqueId = new UniqueEntityId(dto.id);

    if (!(await this.genreRepository.find(uniqueId.value)))
      throw new NotFoundError('Genre not found');

    return this.genreRepository.delete(dto.id);
  }
}
