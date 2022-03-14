import {
  Entity,
  EntityProperties,
  EntityPropertiesInput,
  PlainEntity,
} from '@/@seedwork/entities/entity';
import Name from '@/@seedwork/entities/name';
import Description from '@/@seedwork/entities/description';

export interface MovieProperties extends EntityProperties {
  title: Name;
  description: Description;
  year_launched: number;
}

export interface MoviePropertiesInput
  extends EntityPropertiesInput,
    Pick<MovieProperties, 'title' | 'description' | 'year_launched'> {}

export interface PlainMovie extends PlainEntity {
  title: string;
  description: string;
  year_launched: number;
}

export class Movie extends Entity {
  private _title: Name;
  private _description: Description;
  private _year_launched: number;

  constructor(props: MoviePropertiesInput) {
    super(props);
    this._title = props.title;
    this._description = props.description;
    this._year_launched = props.year_launched;
  }

  get plain(): PlainMovie {
    return {
      ...super.plain,
      title: this.title.value,
      description: this.description.value,
      year_launched: this.year_launched,
    };
  }

  get title() {
    return this._title;
  }

  get description() {
    return this._description;
  }

  get year_launched() {
    return this._year_launched;
  }

  changeYearLaunched(year: number) {
    this._year_launched = year;
  }
}
