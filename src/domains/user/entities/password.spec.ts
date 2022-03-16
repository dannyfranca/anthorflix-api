import InvalidPasswordError from '../errors/invalid-password.error';
import Password from './password';

describe('Password value object', () => {
  it('should accept passwords', () => {
    expect(() => new Password('Abc4$ccc')).not.toThrowError();
    expect(() => new Password('abcA4$cca35$&gghfdfg')).not.toThrowError();
  });

  it('should throw InvalidUsernameError error', () => {
    const password = new Password('Abc4$ccc');
    expect(() => password.changePassword('Abc4$cc')).toThrowError(
      InvalidPasswordError,
    );
    expect(() => new Password('Abc4$cc')).toThrowError(InvalidPasswordError);
    expect(() => new Password('abcA4$cca35$&gghfdfga'.repeat(31))).toThrowError(
      InvalidPasswordError,
    );
    expect(() => new Password('abc4$ccc')).toThrowError(InvalidPasswordError);
  });

  it('should return same hash', () => {
    const password = new Password('Abc4$ccc');
    expect(password.hash).toBe(password.hash);
  });

  it('should return same salt', () => {
    const password = new Password('Abc4$ccc');
    expect(password.salt).toBe(password.salt);
  });

  it('should change hash and salt on password change', () => {
    const password = new Password('Abc4$ccc');
    const hash1 = password.hash;
    const salt1 = password.salt;
    password.changePassword('abcA4$cca35$&gghfdfg');
    const hash2 = password.hash;
    const salt2 = password.salt;
    expect(hash1).not.toBe(hash2);
    expect(salt1).not.toBe(salt2);
  });

  it('should validate password', () => {
    const pass = 'Abc4$ccc';
    const signUpPassword = new Password(pass);
    const salt = signUpPassword.salt;
    const hash = signUpPassword.hash;

    const dbPassword = new Password({ salt, hash });
    const inputPassword = new Password({ pass, salt: dbPassword.salt });
    expect(inputPassword.hash).toBe(dbPassword.hash);
  });
});
