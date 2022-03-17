import { Injectable } from '@nestjs/common';

import { MovieRepository } from '../infra/movie.repository';
import {
  UpdateMovieWhereInput,
  UpdateMovieDataInput,
} from '../dto/update-movie.input';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { Thumb } from '../entities/thumb';
import Url from '@/@seedwork/entities/url';
import NotFoundError from '@/@seedwork/errors/not-found.error';

@Injectable()
export class UpdateMovie {
  constructor(private movieRepository: MovieRepository) {}

  async execute(where: UpdateMovieWhereInput, data: UpdateMovieDataInput) {
    const uniqueId = new UniqueEntityId(where.id);
    const movie = await this.movieRepository.find(uniqueId);
    if (!movie) throw new NotFoundError();
    let genres_ids: UniqueEntityId[] = [];
    let cast_members_ids: UniqueEntityId[] = [];
    let directors_ids: UniqueEntityId[] = [];

    if (data.title) movie.title.changeName(data.title);
    if (data.description) movie.description.changeDescription(data.description);
    if (data.year_launched) movie.changeYearLaunched(data.year_launched);
    if (data.thumb) movie.changeThumb(new Thumb({ url: new Url(data.thumb) }));
    if (data.genres_ids)
      genres_ids = data.genres_ids.map((id) => new UniqueEntityId(id));
    if (data.cast_members_ids)
      cast_members_ids = data.cast_members_ids.map(
        (id) => new UniqueEntityId(id),
      );
    if (data.directors_ids)
      directors_ids = data.directors_ids.map((id) => new UniqueEntityId(id));

    return this.movieRepository.update(movie, {
      genres_ids,
      cast_members_ids,
      directors_ids,
    });
  }
}
