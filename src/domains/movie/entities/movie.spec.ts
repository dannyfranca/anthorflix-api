import { omit } from 'lodash';

import UniqueEntityId from '@/@seedwork/domain/unique-entity-id';
import { Movie, MovieProperties } from './movie';

const title = 'Movie Name';
const description = 'Some movie description';
const year_launched = 2016;
const movieProps = { title, description, year_launched };

describe('Movie Tests', () => {
  test('movie constructor', () => {
    let movie = new Movie({ ...movieProps });
    let created_at: Date;

    const props = omit(movie.props, 'created_at');
    expect(props).toStrictEqual({
      title,
      description,
      year_launched,
    } as MovieProperties);
    expect(movie.created_at).toBeInstanceOf(Date);

    created_at = new Date();
    movie = new Movie({
      ...movieProps,
      created_at,
    });
    expect(movie.props).toStrictEqual({
      title,
      description,
      year_launched,
      created_at,
    } as MovieProperties);

    created_at = new Date();
    movie = new Movie({
      title: 'Another Movie Name',
      description: 'Another movie description',
      year_launched: 2020,
      created_at,
    });
    expect(movie.props).toMatchObject({
      title: 'Another Movie Name',
      description: 'Another movie description',
      year_launched: 2020,
      created_at,
    } as MovieProperties);
  });

  test('movie getters', () => {
    let movie: Movie;
    const created_at = new Date();

    movie = new Movie({ ...movieProps });
    expect(movie.title).toBe(title);
    expect(movie.description).toBe(description);
    expect(movie.year_launched).toBe(year_launched);
    expect(movie.created_at).toBeInstanceOf(Date);

    movie = new Movie({ title, description, year_launched, created_at });
    expect(movie.created_at).toBe(created_at);
  });

  test('id field', () => {
    let movie: Movie;
    const uniqueId = new UniqueEntityId();

    movie = new Movie({ ...movieProps });
    expect(movie.id).toBeInstanceOf(UniqueEntityId);

    movie = new Movie({ ...movieProps }, uniqueId);
    expect(movie.id).toBeInstanceOf(UniqueEntityId);
    expect(movie.id).toBe(uniqueId);
    expect(movie.id.id).toBe(uniqueId.id);
  });
});
