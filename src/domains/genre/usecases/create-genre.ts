import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from '../dto/create-genre.dto';
import { GenreRepository } from '../infra/genre.repository';
import { Genre } from '../entities/genre';
import Name from '@/@seedwork/entities/name';

@Injectable()
export class CreateGenre {
  constructor(private genreRepository: GenreRepository) {}

  execute(dto: CreateGenreDto) {
    const name = new Name(dto.name);
    const genre = new Genre({ name });
    return this.genreRepository.create(genre.plain);
  }
}
