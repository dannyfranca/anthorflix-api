import { SetOptional } from 'type-fest';
import { isInteger } from 'lodash';

import UniqueEntityId from '@/@seedwork/domain/unique-entity-id';
import InvalidRatingError from '@/domains/rating/errors/invalid-rating.error';
import { User } from '@/domains/user/entities/user';

export type RatingProperties = {
  value: number;
  content: string | null;
  created_at: Date;
  user: User;
};

export type RatingPropertiesInput = SetOptional<
  RatingProperties,
  'content' | 'created_at'
>;

export class Rating {
  public readonly id: UniqueEntityId;
  private _value: number;
  private _content: string | null;
  private _created_at: Date;
  private _user: User;

  constructor(props: RatingPropertiesInput, id?: UniqueEntityId) {
    this.id = id ?? new UniqueEntityId();
    this._value = props.value;
    this._user = props.user;
    this._content = props.content ?? null;
    this._created_at = props.created_at ?? new Date();
    this.validate();
  }

  get props(): RatingProperties {
    return {
      value: this.value,
      content: this.content,
      user: this.user,
      created_at: this.created_at,
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

  get created_at() {
    return this._created_at;
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
