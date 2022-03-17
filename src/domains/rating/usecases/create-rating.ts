import { Injectable } from '@nestjs/common';
import { Rating } from '../entities/rating';
import Description from '@/@seedwork/entities/description';
import { MovieRepository } from '@/domains/movie/infra/movie.repository';
import { UserRepository } from '@/domains/user/infra/user.repository';
import NotFoundError from '@/@seedwork/errors/not-found.error';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { CreateRatingInput } from '../dto/create-rating.input';
import { RatingRepository } from '../infra/rating.repository';
import { User } from '@/domains/user/entities/user';
import Username from '@/@seedwork/entities/username';

@Injectable()
export class CreateRating {
  constructor(
    private ratingRepository: RatingRepository,
    private movieRepository: MovieRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(dto: CreateRatingInput & { user_id: string }) {
    if (!(await this.movieRepository.find(new UniqueEntityId(dto.movie_id))))
      throw new NotFoundError('Movie does not exist');

    const plainUser = await this.userRepository.find(dto.user_id);
    if (!plainUser) throw new NotFoundError('User does not exist');

    const movie_id = new UniqueEntityId(dto.movie_id);
    const user_id = new UniqueEntityId(plainUser.id);
    const username = new Username(plainUser.username);
    const user = new User({ ...plainUser, id: user_id, username });
    const value = dto.value;
    const content = new Description(dto.content);
    const rating = new Rating({ content, value, movie_id, user });
    return this.ratingRepository.create(rating.plain);
  }
}
