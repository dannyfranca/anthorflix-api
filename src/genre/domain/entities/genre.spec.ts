import { omit } from 'lodash';

import UniqueEntityId from '@/@seedwork/domain/unique-entity-id';
import { Genre } from './genre';

const name = 'Genre';

describe('Genre Tests', () => {
  test('genre constructor', () => {
    let genre = new Genre({ name });
    let created_at: Date;

    const props = omit(genre.props, 'created_at');
    expect(props).toStrictEqual({
      name,
    });
    expect(genre.created_at).toBeInstanceOf(Date);

    created_at = new Date();
    genre = new Genre({
      name,
      created_at,
    });
    expect(genre.props).toStrictEqual({
      name,
      created_at,
    });

    created_at = new Date();
    genre = new Genre({ name: 'Another Genre', created_at });
    expect(genre.props).toMatchObject({
      name: 'Another Genre',
      created_at,
    });
  });

  test('genre getters', () => {
    let genre: Genre;
    const created_at = new Date();

    genre = new Genre({ name });
    expect(genre.name).toBe(name);
    expect(genre.created_at).toBeInstanceOf(Date);

    genre = new Genre({ name, created_at });
    expect(genre.created_at).toBe(created_at);
  });

  test('id field', () => {
    let genre: Genre;
    const uniqueId = new UniqueEntityId();

    genre = new Genre({ name });
    expect(genre.id).toBeInstanceOf(UniqueEntityId);

    genre = new Genre({ name }, uniqueId);
    expect(genre.id).toBeInstanceOf(UniqueEntityId);
    expect(genre.id).toBe(uniqueId);
    expect(genre.id.id).toBe(uniqueId.id);
  });
});
