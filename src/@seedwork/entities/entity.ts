import { SetOptional } from 'type-fest';

import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';

export type EntityProperties = {
  id: UniqueEntityId;
  created_at: Date;
  deleted_at: Date | null;
};

export type EntityPropertiesInput = SetOptional<
  EntityProperties,
  'id' | 'created_at' | 'deleted_at'
>;

export interface PlainEntity {
  id: string;
  created_at: Date;
  deleted_at: Date | null;
}

export class Entity {
  public readonly id: UniqueEntityId;
  private _created_at: Date;
  private _deleted_at: Date | null;

  constructor(props: EntityPropertiesInput) {
    this.id = props.id ?? new UniqueEntityId();
    this._created_at = props.created_at ?? new Date();
    this._deleted_at = props.deleted_at ?? null;
  }

  get plain(): PlainEntity {
    return {
      id: this.id.value,
      created_at: this.created_at,
      deleted_at: this.deleted_at,
    };
  }

  get created_at() {
    return this._created_at;
  }

  get deleted_at() {
    return this._deleted_at;
  }
}
