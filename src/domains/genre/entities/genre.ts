import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { SetOptional } from 'type-fest';

export type GenreProperties = {
  name: string;
  created_at: Date;
};

export type GenrePropertiesInput = SetOptional<GenreProperties, 'created_at'>;

export class Genre {
  public readonly id: UniqueEntityId;
  private _name: string;
  private _created_at: Date;

  constructor(props: GenrePropertiesInput, id?: UniqueEntityId) {
    this.id = id ?? new UniqueEntityId();
    this._name = props.name;
    this._created_at = props.created_at ?? new Date();
  }

  get props(): GenreProperties {
    return {
      name: this.name,
      created_at: this.created_at,
    };
  }

  get name() {
    return this._name;
  }

  get created_at() {
    return this._created_at;
  }
}
