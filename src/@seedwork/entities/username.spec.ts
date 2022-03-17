import InvalidUsernameError from '../errors/invalid-username.error';
import Username from './username';

describe('username tests', () => {
  it('should accept usernames', () => {
    expect(new Username('username').value).toBe('username');
    expect(new Username('user_').value).toBe('user_');
  });

  it('should throw InvalidUsernameError error', () => {
    expect(() => new Username('user')).toThrowError(InvalidUsernameError);
    expect(() => new Username('u'.repeat(31))).toThrowError(
      InvalidUsernameError,
    );
    expect(() => new Username('user  ')).toThrowError(InvalidUsernameError);
    expect(() => new Username('2username')).toThrowError(InvalidUsernameError);
    expect(() => new Username('user-name')).toThrowError(InvalidUsernameError);
  });
});
