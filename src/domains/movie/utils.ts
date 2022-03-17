import Description from '@/@seedwork/entities/description';
import Name from '@/@seedwork/entities/name';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import Url from '@/@seedwork/entities/url';
import {
  randomDate,
  randomDesc,
  randomName,
  randomYear,
} from '@/@seedwork/utils/mock';
import { Movie, PlainMovie } from './entities/movie';
import { Thumb } from './entities/thumb';

export const makeRandomMovie = ({ id }: { id?: string } = {}): Movie => {
  const uniqueId = new UniqueEntityId(id);
  return new Movie({
    id: uniqueId,
    title: new Name(randomName()),
    description: new Description(randomDesc()),
    year_launched: randomYear(),
    created_at: randomDate(),
    deleted_at: null,
    thumb: new Thumb({ url: new Url('domain.com') }),
    cast_members: [],
    directors: [],
    genres: [],
    general_rating: null,
  });
};

export const makeRandomPlainMovie = (): PlainMovie => {
  const uniqueId = new UniqueEntityId();
  return {
    id: uniqueId.value,
    title: randomName(),
    description: randomDesc(),
    year_launched: randomYear(),
    created_at: randomDate(),
    deleted_at: null,
    general_rating: null,
  };
};
