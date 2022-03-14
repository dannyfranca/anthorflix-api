import Name from '@/@seedwork/entities/name';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { SetOptional } from 'type-fest';

// export enum CastMemberType {
//   DIRECTOR = 'DIRECTOR',
//   ACTOR = 'ACTOR',
// }

export type CastMemberProperties = {
  id: UniqueEntityId;
  name: Name;
  // type: CastMemberType;
  created_at: Date;
  deleted_at: Date | null;
};

export type CastMemberPropertiesInput = SetOptional<
  CastMemberProperties,
  'id' | 'created_at' | 'deleted_at'
>;

export interface PlainCastMember {
  id: string;
  name: string;
  // type: CastMemberType;
  created_at: Date;
  deleted_at: Date | null;
}

export class CastMember {
  public readonly id: UniqueEntityId;
  private _name: Name;
  // private _type: CastMemberType;
  private _created_at: Date;
  private _deleted_at: Date | null;

  constructor(props: CastMemberPropertiesInput) {
    this.id = props.id ?? new UniqueEntityId();
    this._created_at = props.created_at ?? new Date();
    this._deleted_at = props.deleted_at ?? null;
    this._name = props.name;
    // this._type = props.type ?? CastMemberType.ACTOR;
  }

  get plain(): PlainCastMember {
    return {
      id: this.id.value,
      name: this.name.value,
      // type: this.type,
      created_at: this.created_at,
      deleted_at: this.deleted_at,
    };
  }

  get name() {
    return this._name;
  }

  // get type() {
  //   return this._type;
  // }

  get created_at() {
    return this._created_at;
  }

  get deleted_at() {
    return this._deleted_at;
  }
}
