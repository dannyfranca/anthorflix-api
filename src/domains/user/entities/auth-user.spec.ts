import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import Username from '@/@seedwork/entities/username';
import { randomPassword, randomUsername } from '@/@seedwork/utils/mock';
import { AuthUser, PlainAuthUser } from './auth-user';
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
      password: {
        hash: password.hash,
        salt: password.salt,
      },
    } as PlainAuthUser);
    expect(user.created_at).toBeInstanceOf(Date);

    created_at = new Date();
    user = new AuthUser({
      username,
      password,
      created_at,
    });
    expect(user.plain).toMatchObject({
      username: username.value,
      password: {
        hash: password.hash,
        salt: password.salt,
      },
      created_at,
    } as PlainAuthUser);

    created_at = new Date();
    const anotherUser = new Username(randomUsername());
    const anotherPass = new Password(randomPassword());
    user = new AuthUser({
      username: anotherUser,
      password: anotherPass,
      created_at,
    });
    expect(user.plain).toMatchObject({
      username: anotherUser.value,
      password: {
        hash: anotherPass.hash,
        salt: anotherPass.salt,
      },
      created_at,
    } as PlainAuthUser);
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
