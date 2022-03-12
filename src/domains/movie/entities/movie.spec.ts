import { omit } from 'lodash';

import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { Movie, MovieProperties } from './movie';
import { Genre } from '@/domains/genre/entities/genre';
import {
  CastMember,
  CastMemberType,
} from '@/domains/cast-members/entities/cast-member';

const title = 'Movie Name';
const description = 'Some movie description';
const year_launched = 2016;
const generateMovieProps = () => ({
  title,
  description,
  year_launched,
});
const generateGenres = () => [
  new Genre({ name: 'Some genre' }),
  new Genre({ name: 'Other genre' }),
];
const generateCastMembers = () => [
  new CastMember({ name: 'Director', type: CastMemberType.DIRECTOR }),
  new CastMember({ name: 'John Doe', type: CastMemberType.ACTOR }),
  new CastMember({ name: 'Jane Doe', type: CastMemberType.ACTOR }),
];

describe('Movie Tests', () => {
  test('movie constructor', () => {
    const genres = generateGenres();
    const cast_members = generateCastMembers();
    let movie = new Movie({ ...generateMovieProps(), genres, cast_members });
    let created_at: Date;

    const props = omit(movie.props, 'created_at');
    expect(props).toStrictEqual({
      title,
      description,
      year_launched,
      genres,
      cast_members,
    } as MovieProperties);
    expect(movie.created_at).toBeInstanceOf(Date);

    created_at = new Date();
    movie = new Movie({
      ...generateMovieProps(),
      created_at,
      genres,
      cast_members,
    });
    expect(movie.props).toStrictEqual({
      title,
      description,
      year_launched,
      created_at,
      genres,
      cast_members,
    } as MovieProperties);

    created_at = new Date();
    movie = new Movie({
      title: 'Another Movie Name',
      description: 'Another movie description',
      year_launched: 2020,
      created_at,
      genres,
      cast_members,
    });
    expect(movie.props).toMatchObject({
      title: 'Another Movie Name',
      description: 'Another movie description',
      year_launched: 2020,
      created_at,
    } as MovieProperties);
  });

  test('movie getters', () => {
    const genres = generateGenres();
    const cast_members = generateCastMembers();
    let movie: Movie;
    const created_at = new Date();

    movie = new Movie({ ...generateMovieProps(), genres, cast_members });
    expect(movie.title).toBe(title);
    expect(movie.description).toBe(description);
    expect(movie.year_launched).toBe(year_launched);
    expect(movie.genres.map((v) => v.props)).toStrictEqual(
      genres.map((v) => v.props),
    );
    expect(movie.cast_members.map((v) => v.props)).toStrictEqual(
      cast_members.map((v) => v.props),
    );
    expect(movie.created_at).toBeInstanceOf(Date);

    movie = new Movie({
      title,
      description,
      year_launched,
      created_at,
      genres,
      cast_members,
    });
    expect(movie.created_at).toBe(created_at);
  });

  test('id field', () => {
    const genres = generateGenres();
    const cast_members = generateCastMembers();
    let movie: Movie;
    const uniqueId = new UniqueEntityId();

    movie = new Movie({ ...generateMovieProps(), genres, cast_members });
    expect(movie.id).toBeInstanceOf(UniqueEntityId);

    movie = new Movie(
      { ...generateMovieProps(), genres, cast_members },
      uniqueId,
    );
    expect(movie.id).toBeInstanceOf(UniqueEntityId);
    expect(movie.id).toBe(uniqueId);
    expect(movie.id.id).toBe(uniqueId.id);
  });
});
