import { Injectable } from '@nestjs/common';

import { GenreRepository } from '../infra/genre.repository';
import { Genre } from '../entities/genre';
import {
  UpdateGenreWhereInput,
  UpdateGenreDataInput,
} from '../dto/update-genre.input';
import Name from '@/@seedwork/entities/name';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import NotFoundError from '@/@seedwork/errors/not-found.error';

@Injectable()
export class UpdateGenre {
  constructor(private genreRepository: GenreRepository) {}

  async execute(where: UpdateGenreWhereInput, data: UpdateGenreDataInput) {
    const uniqueId = new UniqueEntityId(where.id);
    const plainGenre = await this.genreRepository.find(uniqueId.value);

    if (!plainGenre) throw new NotFoundError('Genre not found');

    const nameVo = new Name(plainGenre.name);
    const genre = new Genre({ id: uniqueId, name: nameVo });

    if (data.name) genre.name.changeName(data.name);

    const { id, ...props } = genre.plain;
    return this.genreRepository.update({ id }, { ...props });
  }
}
