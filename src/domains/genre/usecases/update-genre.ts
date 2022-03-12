import { Injectable } from '@nestjs/common';

import { GenreRepository } from '../infra/genre.repository';
import { Genre } from '../entities/genre';
import Name from '@/@seedwork/entities/name';
import { UpdateGenreDto } from '../dto/update-genre.dto';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import NotFoundError from '@/@seedwork/errors/not-found';

@Injectable()
export class UpdateGenre {
  constructor(private genreRepository: GenreRepository) {}

  async execute(dto: UpdateGenreDto) {
    const uniqueId = new UniqueEntityId(dto.id);
    const name = new Name(dto.data.name);
    const genre = new Genre({ name }, uniqueId);

    if (!(await this.genreRepository.find(uniqueId.value)))
      throw new NotFoundError('Genre not found');

    return this.genreRepository.update({
      id: uniqueId.value,
      data: { name: genre.name.value },
    });
  }
}
