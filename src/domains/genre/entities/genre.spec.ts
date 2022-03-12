import { omit } from 'lodash';

import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { Genre } from './genre';
import Name from '@/@seedwork/entities/name';

const strName = 'Genre';

describe('Genre Tests', () => {
  test('genre constructor', () => {
    const name = new Name(strName);
    let genre = new Genre({ name });
    let created_at: Date;

    const props = omit(genre.plain, 'created_at');
    expect(props).toMatchObject({
      name: strName,
    });
    expect(genre.created_at).toBeInstanceOf(Date);

    created_at = new Date();
    genre = new Genre({
      name,
      created_at,
    });
    expect(genre.plain).toMatchObject({
      name: strName,
      created_at,
    });

    created_at = new Date();
    genre = new Genre({ name: new Name('Another Genre'), created_at });
    expect(genre.plain).toMatchObject({
      name: 'Another Genre',
      created_at,
    });
  });

  test('genre getters', () => {
    const name = new Name(strName);
    let genre: Genre;
    const created_at = new Date();

    genre = new Genre({ name });
    expect(genre.name.value).toBe(strName);
    expect(genre.created_at).toBeInstanceOf(Date);

    genre = new Genre({ name, created_at });
    expect(genre.created_at).toBe(created_at);
  });

  test('id field', () => {
    const name = new Name(strName);
    let genre: Genre;
    const uniqueId = new UniqueEntityId();

    genre = new Genre({ name });
    expect(genre.id).toBeInstanceOf(UniqueEntityId);

    genre = new Genre({ id: uniqueId, name });
    expect(genre.id).toBeInstanceOf(UniqueEntityId);
    expect(genre.id).toBe(uniqueId);
    expect(genre.id.value).toBe(uniqueId.value);
  });
});
