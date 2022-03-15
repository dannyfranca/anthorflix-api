import InvalidNameError from '../errors/invalid-name.error';
import Name from './name';

describe('Name value object', () => {
  it('should accept valid name', () => {
    const name = new Name('John Doe');

    expect(name.value).toBe('John Doe');
  });

  it('should accept name change', () => {
    const name = new Name('John Doe');

    name.changeName('Jack');

    expect(name.value).toBe('Jack');
  });

  it('should reject name change', () => {
    const name = new Name('John Doe');

    expect(() => name.changeName('a'.repeat(260))).toThrow(InvalidNameError);
  });

  it('should reject name with less than 2 characters', () => {
    expect(() => new Name('a')).toThrow(InvalidNameError);
  });

  it('should reject name with more than 255 characters', () => {
    expect(() => new Name('a'.repeat(260))).toThrow(InvalidNameError);
  });
});
