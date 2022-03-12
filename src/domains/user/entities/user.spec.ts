import { omit } from 'lodash';

import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { User, UserProperties } from './user';

const username = 'some_user';

describe('User Tests', () => {
  test('user constructor', () => {
    let user = new User({ username });
    let created_at: Date;

    const props = omit(user.props, 'created_at');
    expect(props).toStrictEqual({
      username,
    } as UserProperties);
    expect(user.created_at).toBeInstanceOf(Date);

    created_at = new Date();
    user = new User({
      username,
      created_at,
    } as UserProperties);
    expect(user.props).toStrictEqual({
      username,
      created_at,
    } as UserProperties);

    created_at = new Date();
    user = new User({ username: 'another_user', created_at });
    expect(user.props).toMatchObject({
      username: 'another_user',
      created_at,
    } as UserProperties);
  });

  test('user getters', () => {
    let user: User;
    const created_at = new Date();

    user = new User({ username });
    expect(user.username).toBe(username);
    expect(user.created_at).toBeInstanceOf(Date);

    user = new User({ username: username, created_at });
    expect(user.created_at).toBe(created_at);
  });

  test('id field', () => {
    let user: User;
    const uniqueId = new UniqueEntityId();

    user = new User({ username: username });
    expect(user.id).toBeInstanceOf(UniqueEntityId);

    user = new User({ username: username }, uniqueId);
    expect(user.id).toBeInstanceOf(UniqueEntityId);
    expect(user.id).toBe(uniqueId);
    expect(user.id.value).toBe(uniqueId.value);
  });
});
