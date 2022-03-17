import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import Username from '@/@seedwork/entities/username';
import { randomPassword, randomUsername } from '@/@seedwork/utils/mock';
import { AuthUser } from './auth-user';
import Password from './password';
import { PlainUser } from './user';

const username = new Username(randomUsername());

describe('User Tests', () => {
  test('user constructor', () => {
    const pass = randomPassword();
    let password = new Password(pass);
    let user = new AuthUser({ username, password });
    let created_at: Date;

    expect(user.plain).toMatchObject({
      username: username.value,
    } as PlainUser);
    expect(user.created_at).toBeInstanceOf(Date);

    created_at = new Date();
    user = new AuthUser({
      username,
      password,
      created_at,
    });
    expect(user.plain).toMatchObject({
      username: username.value,
      created_at,
    } as PlainUser);
    expect(user.plain).not.toMatchObject({
      username: username.value,
      password: password.hash,
      created_at,
    });

    created_at = new Date();
    const anotherUser = randomUsername();
    const anotherPass = randomPassword();
    user = new AuthUser({
      username: new Username(anotherUser),
      password: new Password(anotherPass),
      created_at,
    });
    expect(user.plain).toMatchObject({
      username: anotherUser,
      created_at,
    } as PlainUser);
  });

  test('user getters', () => {
    let user: AuthUser;
    let password = new Password(randomPassword());
    const created_at = new Date();

    user = new AuthUser({ username, password });
    expect(user.username).toBe(username);
    expect(user.password.hash).toBe(password.hash);
    expect(user.created_at).toBeInstanceOf(Date);

    user = new AuthUser({ username, password, created_at });
    expect(user.created_at).toBe(created_at);
  });

  test('id field', () => {
    let user: AuthUser;
    let password = new Password(randomPassword());
    const uniqueId = new UniqueEntityId();

    user = new AuthUser({ username, password });
    expect(user.id).toBeInstanceOf(UniqueEntityId);

    user = new AuthUser({ id: uniqueId, username, password });
    expect(user.id).toBeInstanceOf(UniqueEntityId);
    expect(user.id).toBe(uniqueId);
    expect(user.id.value).toBe(uniqueId.value);
  });
});
