import Name from '@/@seedwork/entities/name';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import {
  Entity,
  EntityProperties,
  EntityPropertiesInput,
  PlainEntity,
} from '@/@seedwork/entities/entity';

export interface GenreProperties extends EntityProperties {
  name: Name;
}

export interface GenrePropertiesInput
  extends EntityPropertiesInput,
    Pick<GenreProperties, 'name'> {}

export interface PlainGenre extends PlainEntity {
  name: string;
}

export class Genre extends Entity {
  public readonly id: UniqueEntityId;
  private _name: Name;

  constructor(props: GenrePropertiesInput) {
    super(props);
    this._name = props.name;
  }

  get plain(): PlainGenre {
    return {
      ...super.plain,
      name: this.name.value,
    };
  }

  get name() {
    return this._name;
  }
}
