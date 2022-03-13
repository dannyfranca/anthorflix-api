import { SetOptional } from 'type-fest';
import { isInteger } from 'lodash';

import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import InvalidRatingError from '@/domains/rating/errors/invalid-rating.error';
import { User } from '@/domains/user/entities/user';
import { Comment } from '@/domains/comment/entities/comment';

export type RatingProperties = {
  value: number;
  content: string | null;
  created_at: Date;
  user: User;
  movie_id: UniqueEntityId;
  comments: Comment[];
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
  private _movie_id: UniqueEntityId;
  private _comments: Comment[];

  constructor(props: RatingPropertiesInput, id?: UniqueEntityId) {
    this.id = id ?? new UniqueEntityId();
    this._value = props.value;
    this._user = props.user;
    this._movie_id = props.movie_id;
    this._comments = props.comments;
    this._content = props.content ?? null;
    this._created_at = props.created_at ?? new Date();
    this.validate();
  }

  get props(): RatingProperties {
    return {
      value: this.value,
      content: this.content,
      user: this.user,
      movie_id: this.movie_id,
      created_at: this.created_at,
      comments: this.comments,
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

  get comments() {
    return this._comments;
  }

  get created_at() {
    return this._created_at;
  }

  commentCount() {
    return this.comments.length;
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
