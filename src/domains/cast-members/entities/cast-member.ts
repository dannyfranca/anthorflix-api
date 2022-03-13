import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { SetOptional } from 'type-fest';

export enum CastMemberType {
  DIRECTOR = 'DIRECTOR',
  ACTOR = 'ACTOR',
}

export type CastMemberProperties = {
  name: string;
  type: CastMemberType;
  created_at: Date;
};

export type CastMemberPropertiesInput = SetOptional<
  CastMemberProperties,
  'type' | 'created_at'
>;

export class CastMember {
  public readonly id: UniqueEntityId;
  private _name: string;
  private _type: CastMemberType;
  private _created_at: Date;

  constructor(props: CastMemberPropertiesInput, id?: UniqueEntityId) {
    this.id = id ?? new UniqueEntityId();
    this._name = props.name;
    this._type = props.type ?? CastMemberType.ACTOR;
    this._created_at = props.created_at ?? new Date();
  }

  get props(): CastMemberProperties {
    return {
      name: this.name,
      type: this.type,
      created_at: this.created_at,
    };
  }

  get name() {
    return this._name;
  }

  get type() {
    return this._type;
  }

  get created_at() {
    return this._created_at;
  }
}
