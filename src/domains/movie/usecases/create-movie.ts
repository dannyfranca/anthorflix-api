import { Injectable } from '@nestjs/common';
import { CreateMovieInput } from '../dto/create-movie.input';
import { MovieRepository } from '../infra/movie.repository';
import { Movie } from '../entities/movie';
import Name from '@/@seedwork/entities/name';
import Description from '@/@seedwork/entities/description';

@Injectable()
export class CreateMovie {
  constructor(private movieRepository: MovieRepository) {}

  async execute(dto: CreateMovieInput) {
    const title = new Name(dto.title);
    const description = new Description(dto.description);
    const year_launched = dto.year_launched;
    const movie = new Movie({ title, description, year_launched });
    return this.movieRepository.create(movie.plain);
  }
}
