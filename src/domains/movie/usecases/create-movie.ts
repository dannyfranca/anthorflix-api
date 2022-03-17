import { Injectable } from '@nestjs/common';
import { CreateMovieInput } from '../dto/create-movie.input';
import { MovieRepository } from '../infra/movie.repository';
import { Movie } from '../entities/movie';
import Name from '@/@seedwork/entities/name';
import Description from '@/@seedwork/entities/description';
import { Thumb } from '../entities/thumb';
import Url from '@/@seedwork/entities/url';

@Injectable()
export class CreateMovie {
  constructor(private movieRepository: MovieRepository) {}

  async execute(dto: CreateMovieInput) {
    const title = new Name(dto.title);
    const description = new Description(dto.description);
    const thumb = dto.thumb
      ? new Thumb({ url: new Url(dto.thumb) })
      : undefined;
    const year_launched = dto.year_launched;
    const movie = new Movie({ title, description, year_launched, thumb });
    await this.movieRepository.create(movie);
    return await this.movieRepository.find(movie.id);
  }
}
