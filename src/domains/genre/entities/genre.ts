import { SetOptional } from 'type-fest';

import Name from '@/@seedwork/entities/name';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';

export type GenreProperties = {
  id: UniqueEntityId;
  name: Name;
  created_at: Date;
  deleted_at: Date | null;
};

export type GenrePropertiesInput = SetOptional<
  GenreProperties,
  'id' | 'created_at' | 'deleted_at'
>;

export interface PlainGenre {
  id: string;
  name: string;
  created_at: Date;
  deleted_at: Date | null;
}

export class Genre {
  public readonly id: UniqueEntityId;
  private _name: Name;
  private _created_at: Date;
  private _deleted_at: Date | null;

  constructor(props: GenrePropertiesInput) {
    this.id = props.id ?? new UniqueEntityId();
    this._name = props.name;
    this._created_at = props.created_at ?? new Date();
    this._deleted_at = props.deleted_at ?? null;
  }

  get plain(): PlainGenre {
    return {
      id: this.id.value,
      name: this.name.value,
      created_at: this.created_at,
      deleted_at: this.deleted_at,
    };
  }

  get name() {
    return this._name;
  }

  get created_at() {
    return this._created_at;
  }

  get deleted_at() {
    return this._deleted_at;
  }
}
