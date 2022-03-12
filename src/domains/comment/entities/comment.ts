import { SetOptional } from 'type-fest';

import UniqueEntityId from '@/@seedwork/domain/unique-entity-id';
import { User } from '@/domains/user/entities/user';

export type CommentProperties = {
  content: string;
  created_at: Date;
  user: User;
};

export type CommentPropertiesInput = SetOptional<
  CommentProperties,
  'created_at'
>;

export class Comment {
  public readonly id: UniqueEntityId;
  private _content: string;
  private _created_at: Date;
  private _user: User;

  constructor(props: CommentPropertiesInput, id?: UniqueEntityId) {
    this.id = id ?? new UniqueEntityId();
    this._content = props.content;
    this._user = props.user;
    this._created_at = props.created_at ?? new Date();
  }

  get props(): CommentProperties {
    return {
      content: this.content,
      created_at: this.created_at,
      user: this.user,
    };
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
}
