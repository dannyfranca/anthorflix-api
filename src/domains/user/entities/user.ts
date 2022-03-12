import { SetOptional } from 'type-fest';

import UniqueEntityId from '@/@seedwork/domain/unique-entity-id';

export type UserProperties = {
  username: string;
  created_at: Date;
};

export type UserPropertiesInput = SetOptional<UserProperties, 'created_at'>;

export class User {
  public readonly id: UniqueEntityId;
  private _username: string;
  private _created_at: Date;

  constructor(props: UserPropertiesInput, id?: UniqueEntityId) {
    this.id = id ?? new UniqueEntityId();
    this._username = props.username;
    this._created_at = props.created_at ?? new Date();
  }

  get props(): UserProperties {
    return {
      username: this.username,
      created_at: this.created_at,
    };
  }

  get username() {
    return this._username;
  }

  get created_at() {
    return this._created_at;
  }
}
