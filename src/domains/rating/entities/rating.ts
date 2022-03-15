import { isInteger } from 'lodash';

import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import InvalidRatingError from '@/domains/rating/errors/invalid-rating.error';
import { PlainUser, User } from '@/domains/user/entities/user';
import {
  Entity,
  EntityProperties,
  EntityPropertiesInput,
  PlainEntity,
} from '@/@seedwork/entities/entity';
import Description from '@/@seedwork/entities/description';
import { SetOptional } from 'type-fest';

interface RatingOnlyProperties {
  value: number;
  content: Description | null;
  user: User;
  movie_id: UniqueEntityId;
}

export interface RatingProperties
  extends EntityProperties,
    RatingOnlyProperties {}

export interface RatingPropertiesInput
  extends EntityPropertiesInput,
    SetOptional<RatingOnlyProperties, 'content'> {}

export interface PlainRating extends PlainEntity {
  value: number;
  content: string | null;
  movie_id: string;
  user_id: string;
  user: PlainUser;
}

export class Rating extends Entity {
  private _value: number;
  private _content: Description | null;
  private _user: User;
  private _movie_id: UniqueEntityId;

  constructor(props: RatingPropertiesInput) {
    super(props);
    this._value = props.value;
    this._user = props.user;
    this._movie_id = props.movie_id;
    this._content = props.content ?? null;
    this.validate();
  }

  get plain(): PlainRating {
    return {
      ...super.plain,
      value: this.value,
      content: this.content?.value ?? null,
      user: this.user.plain,
      user_id: this.user.id.value,
      movie_id: this.movie_id.value,
    };
  }

  get value() {
    return this._value;
  }

  get content() {
    return this._content;
  }

  get user() {
    return this._user;
  }

  get movie_id() {
    return this._movie_id;
  }

  validate() {
    if (!Rating.isValidMargin(this.value) || !Rating.isInteger(this.value))
      throw new InvalidRatingError();
  }

  private static isInteger(value: number) {
    return isInteger(value);
  }

  private static isValidMargin(value: number) {
    return value > 0 && value < 10;
  }
}
