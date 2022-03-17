import { omit } from 'lodash';

import { Movie, PlainMovie } from './movie';
import Name from '@/@seedwork/entities/name';
import Description from '@/@seedwork/entities/description';
import { Thumb } from './thumb';
import Url from '@/@seedwork/entities/url';

const title = 'Movie Name';
const description = 'Some real crazy Lorem Ipsum description';
const year_launched = 2016;
const generateMovieProps = () => ({
  title: new Name(title),
  description: new Description(description),
  year_launched,
});
const generateMoviePropsWithThumb = () => ({
  ...generateMovieProps(),
  thumb: new Thumb({ url: new Url('domain.com') }),
});

describe('Movie Tests', () => {
  test('movie constructor', () => {
    let movie = new Movie({ ...generateMovieProps() });
    let created_at: Date;

    const props = omit(movie.plain, 'created_at');
    expect(props).toMatchObject({
      title,
      description,
      year_launched,
    } as PlainMovie);
    expect(movie.created_at).toBeInstanceOf(Date);
    expect(movie.deleted_at).toBeNull();

    created_at = new Date();
    movie = new Movie({
      ...generateMovieProps(),
      created_at,
    });
    expect(movie.plain).toMatchObject({
      title,
      description,
      year_launched,
      thumb: undefined,
      created_at,
    } as PlainMovie);

    created_at = new Date();
    movie = new Movie({
      title: new Name('Another Movie Name'),
      description: new Description('Another movie description'),
      year_launched: 2020,
      created_at,
    });
    expect(movie.plain).toMatchObject({
      title: 'Another Movie Name',
      description: 'Another movie description',
      year_launched: 2020,
      thumb: undefined,
      created_at,
    } as PlainMovie);

    movie = new Movie({ ...generateMoviePropsWithThumb() });
    expect(movie.plain).toMatchObject({
      title: movie.title.value,
      description: movie.description.value,
      year_launched: movie.year_launched,
      thumb: movie.thumb?.url.value,
      created_at: movie.created_at,
    } as PlainMovie);
  });

  test('movie getters', () => {
    let movie: Movie;
    const created_at = new Date();

    movie = new Movie({ ...generateMovieProps() });
    expect(movie.title.value).toBe(title);
    expect(movie.description.value).toBe(description);
    expect(movie.year_launched).toBe(year_launched);
    expect(movie.created_at).toBeInstanceOf(Date);

    movie = new Movie({
      title: new Name(title),
      description: new Description(description),
      year_launched,
      created_at,
    });
    expect(movie.created_at).toBe(created_at);
  });

  it('should change thumb', () => {
    const movie = new Movie(generateMoviePropsWithThumb());
    movie.changeThumb(new Thumb({ url: new Url('domain.com') }));
    expect(movie.thumb?.url.value).toBe('domain.com');
  });
});
