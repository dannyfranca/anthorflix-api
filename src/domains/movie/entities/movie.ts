import { SetOptional } from 'type-fest';

import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { CastMember } from '@/domains/cast-members/entities/cast-member';
import { Genre } from '@/domains/genre/entities/genre';

export type MovieProperties = {
  title: string;
  description: string;
  year_launched: number;
  created_at: Date;
  cast_members: CastMember[];
  genres: Genre[];
};

export type MoviePropertiesInput = SetOptional<MovieProperties, 'created_at'>;

export class Movie {
  public readonly id: UniqueEntityId;
  private _title: string;
  private _description: string;
  private _year_launched: number;
  private _created_at: Date;
  private _cast_members: CastMember[];
  private _genres: Genre[];

  constructor(props: MoviePropertiesInput, id?: UniqueEntityId) {
    this.id = id ?? new UniqueEntityId();
    this._title = props.title;
    this._description = props.description;
    this._year_launched = props.year_launched;
    this._cast_members = props.cast_members;
    this._genres = props.genres;
    this._created_at = props.created_at ?? new Date();
  }

  get props(): MovieProperties {
    return {
      title: this.title,
      description: this.description,
      year_launched: this.year_launched,
      cast_members: this.cast_members,
      genres: this.genres,
      created_at: this.created_at,
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

  get cast_members() {
    return this._cast_members;
  }

  get genres() {
    return this._genres;
  }

  get created_at() {
    return this._created_at;
  }
}
