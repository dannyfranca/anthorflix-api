import {
  Entity,
  EntityProperties,
  EntityPropertiesInput,
  PlainEntity,
} from '@/@seedwork/entities/entity';
import Name from '@/@seedwork/entities/name';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';

// export enum CastMemberType {
//   DIRECTOR = 'DIRECTOR',
//   ACTOR = 'ACTOR',
// }

export interface CastMemberProperties extends EntityProperties {
  name: Name;
  // type: CastMemberType;
}

export interface CastMemberPropertiesInput
  extends EntityPropertiesInput,
    Pick<CastMemberProperties, 'name'> {}

export interface PlainCastMember extends PlainEntity {
  name: string;
  // type: CastMemberType;
}

export class CastMember extends Entity {
  public readonly id: UniqueEntityId;
  private _name: Name;
  // private _type: CastMemberType;

  constructor(props: CastMemberPropertiesInput) {
    super(props);
    this._name = props.name;
    // this._type = props.type ?? CastMemberType.ACTOR;
  }

  get plain(): PlainCastMember {
    return {
      ...super.plain,
      name: this.name.value,
      // type: this.type,
    };
  }

  get name() {
    return this._name;
  }

  // get type() {
  //   return this._type;
  // }
}
