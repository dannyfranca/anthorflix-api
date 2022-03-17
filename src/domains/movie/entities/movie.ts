import {
  Entity,
  EntityProperties,
  EntityPropertiesInput,
  PlainEntity,
} from '@/@seedwork/entities/entity';
import Name from '@/@seedwork/entities/name';
import Description from '@/@seedwork/entities/description';
import {
  CastMember,
  PlainCastMember,
} from '@/domains/cast-members/entities/cast-member';
import { Genre, PlainGenre } from '@/domains/genre/entities/genre';
import { Rating } from '@/domains/rating/entities/rating';
import { Thumb } from './thumb';

export interface MovieProperties extends EntityProperties {
  title: Name;
  description: Description;
  year_launched: number;
  thumb?: Thumb;
  general_rating?: number | null;
  genres?: Genre[];
  directors?: CastMember[];
  cast_members?: CastMember[];
}

export interface MoviePropertiesInput
  extends EntityPropertiesInput,
    Omit<MovieProperties, 'id' | 'created_at' | 'deleted_at'> {}

export interface PlainMovie extends PlainEntity {
  title: string;
  description: string;
  year_launched: number;
  thumb?: string;
  general_rating: number | null;
  genres?: PlainGenre[];
  directors?: PlainCastMember[];
  cast_members?: PlainCastMember[];
}

export class Movie extends Entity {
  private _title: Name;
  private _description: Description;
  private _year_launched: number;
  private _thumb: Thumb | undefined;
  private _general_rating: number | null;
  private _genres: Genre[];
  private _directors: CastMember[];
  private _cast_members: CastMember[];

  constructor(props: MoviePropertiesInput) {
    super(props);
    this._title = props.title;
    this._description = props.description;
    this._year_launched = props.year_launched;
    this._thumb = props.thumb ?? undefined;
    this._general_rating = props.general_rating ?? null;
    this._genres = props.genres ?? [];
    this._directors = props.directors ?? [];
    this._cast_members = props.cast_members ?? [];
  }

  get plain(): PlainMovie {
    return {
      ...super.plain,
      title: this.title.value,
      description: this.description.value ?? '',
      year_launched: this.year_launched,
      thumb: this.thumb?.url.value,
      general_rating: this._general_rating,
      genres: this._genres.map((v) => v.plain),
      directors: this._directors.map((v) => v.plain),
      cast_members: this._cast_members.map((v) => v.plain),
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

  get thumb() {
    return this._thumb;
  }

  changeYearLaunched(year: number) {
    this._year_launched = year;
  }

  changeThumb(thumb: Thumb) {
    this._thumb = thumb;
  }
}
