import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import Username from '@/@seedwork/entities/username';
import { PlainUser, User } from './user';

const username = new Username('some_user');

describe('User Tests', () => {
  test('user constructor', () => {
    let user = new User({ username });
    let created_at: Date;

    expect(user.plain).toMatchObject({
      username: username.value,
    } as PlainUser);
    expect(user.created_at).toBeInstanceOf(Date);

    created_at = new Date();
    user = new User({
      username,
      created_at,
    });
    expect(user.plain).toMatchObject({
      username: username.value,
      created_at,
    } as PlainUser);

    created_at = new Date();
    user = new User({ username: new Username('another_user'), created_at });
    expect(user.plain).toMatchObject({
      username: 'another_user',
      created_at,
    } as PlainUser);
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

    user = new User({ id: uniqueId, username: username });
    expect(user.id).toBeInstanceOf(UniqueEntityId);
    expect(user.id).toBe(uniqueId);
    expect(user.id.value).toBe(uniqueId.value);
  });
});
