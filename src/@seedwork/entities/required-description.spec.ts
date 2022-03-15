import RequiredDescription from './required-description';
import InvalidRequiredDescriptionError from '../errors/invalid-description.error';
import InvalidDescriptionError from '../errors/invalid-description.error';

const descStr = 'John Doe is a unknown man.';

describe('RequiredDescription value object', () => {
  it('should accept valid description', () => {
    expect(new RequiredDescription(descStr).value).toBe(descStr);
  });

  it('should accept description change', () => {
    const description = new RequiredDescription(descStr);
    const newDesc = 'Jack is a serious man.';

    description.changeDescription(newDesc);

    expect(description.value).toBe(newDesc);
  });

  it('should reject description change', () => {
    const description = new RequiredDescription(descStr);

    expect(() => description.changeDescription('a'.repeat(10001))).toThrow(
      InvalidRequiredDescriptionError,
    );
  });

  it('should reject description with less than 2 characters', () => {
    expect(() => new RequiredDescription('a')).toThrow(InvalidDescriptionError);
  });

  it('should reject description with more than 255 characters', () => {
    expect(() => new RequiredDescription('a'.repeat(10001))).toThrow(
      InvalidRequiredDescriptionError,
    );
  });
});
