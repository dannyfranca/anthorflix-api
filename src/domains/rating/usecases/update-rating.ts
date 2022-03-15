import { Injectable } from '@nestjs/common';

import { RatingRepository } from '../infra/rating.repository';
import { Rating } from '../entities/rating';
import {
  UpdateRatingWhereInput,
  UpdateRatingDataInput,
} from '../dto/update-rating.input';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import NotFoundError from '@/@seedwork/errors/not-found.error';
import Description from '@/@seedwork/entities/description';
import { UserRepository } from '@/domains/user/infra/user.repository';
import { User } from '@/domains/user/entities/user';
import Username from '@/@seedwork/entities/username';

@Injectable()
export class UpdateRating {
  constructor(
    private ratingRepository: RatingRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(where: UpdateRatingWhereInput, data: UpdateRatingDataInput) {
    const uniqueId = new UniqueEntityId(where.id);
    const plainRating = await this.ratingRepository.find(uniqueId.value);

    if (!plainRating) throw new NotFoundError('Rating not found');

    const plainUser = await this.userRepository.find(plainRating.user_id);
    if (!plainUser) throw new NotFoundError('User does not exist');

    const content = new Description(plainRating.content);

    const user_id = new UniqueEntityId(plainUser.id);
    const username = new Username(plainUser.username);
    const rating = new Rating({
      id: uniqueId,
      content,
      value: plainRating.value,
      movie_id: new UniqueEntityId(plainRating.movie_id),
      user: new User({
        ...plainUser,
        id: user_id,
        username,
      }),
    });

    if (data.content) rating.content.changeDescription(data.content);
    if (data.value) rating.changeValue(data.value);

    const { id, ...props } = rating.plain;
    return this.ratingRepository.update({ id }, { ...props });
  }
}
