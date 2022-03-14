import { Injectable } from '@nestjs/common';

import { MovieRepository } from '../infra/movie.repository';
import { Movie } from '../entities/movie';
import {
  UpdateMovieWhereInput,
  UpdateMovieDataInput,
} from '../dto/update-movie.input';
import Name from '@/@seedwork/entities/name';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import NotFoundError from '@/@seedwork/errors/not-found.error';
import Description from '@/@seedwork/entities/description';

@Injectable()
export class UpdateMovie {
  constructor(private movieRepository: MovieRepository) {}

  async execute(where: UpdateMovieWhereInput, data: UpdateMovieDataInput) {
    const uniqueId = new UniqueEntityId(where.id);
    const plainMovie = await this.movieRepository.find(uniqueId.value);

    if (!plainMovie) throw new NotFoundError('Movie not found');

    const titleVo = new Name(plainMovie.title);
    const descriptionVo = new Description(plainMovie.description);
    const year_launched = plainMovie.year_launched;
    const movie = new Movie({
      id: uniqueId,
      title: titleVo,
      description: descriptionVo,
      year_launched,
    });

    if (data.title) movie.title.changeName(data.title);
    if (data.description) movie.description.changeDescription(data.description);
    if (data.year_launched) movie.changeYearLaunched(data.year_launched);

    const { id, ...props } = movie.plain;
    return this.movieRepository.update({ id }, { ...props });
  }
}
