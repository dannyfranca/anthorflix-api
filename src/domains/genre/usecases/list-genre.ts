import { Injectable } from '@nestjs/common';
import { GenreRepository } from '../infra/genre.repository';

@Injectable()
export class ListGenre {
  constructor(private genreRepository: GenreRepository) {}

  async execute() {
    return this.genreRepository.list();
  }
}
