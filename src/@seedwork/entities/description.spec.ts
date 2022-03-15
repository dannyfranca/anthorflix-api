import Description from './description';
import InvalidDescriptionError from '../errors/invalid-description.error';

const descStr = 'John Doe is a unknown man.';

describe('Description value object', () => {
  it('should accept valid description', () => {
    expect(new Description(descStr).value).toBe(descStr);
    expect(new Description(null).value).toBeNull();
  });

  it('should accept description change', () => {
    const description = new Description(descStr);
    const newDesc = 'Jack is a serious man.';

    description.changeDescription(newDesc);

    expect(description.value).toBe(newDesc);

    description.changeDescription(null);

    expect(description.value).toBeNull();
  });

  it('should reject description change', () => {
    const description = new Description(descStr);

    expect(() => description.changeDescription('a'.repeat(10001))).toThrow(
      InvalidDescriptionError,
    );
  });

  it('should reject description with less than 2 characters', () => {
    expect(() => new Description('a')).toThrow(InvalidDescriptionError);
  });

  it('should reject description with more than 255 characters', () => {
    expect(() => new Description('a'.repeat(10001))).toThrow(
      InvalidDescriptionError,
    );
  });
});
