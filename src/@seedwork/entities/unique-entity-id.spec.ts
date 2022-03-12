import InvalidUuidError from '../errors/invalid-uuid.error';
import UniqueEntityId from './unique-entity-id';

describe('Unique Id Unit Tests', () => {
  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

  beforeEach(() => validateSpy.mockClear());

  it('should accept nothing passed in constructor', () => {
    let uniqueId: UniqueEntityId | undefined;

    expect(() => (uniqueId = new UniqueEntityId())).not.toThrow();
    expect(uniqueId?.id).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should accept a valid uuid passed in constructor', () => {
    const validUUID = '766a36f1-077f-4e18-ab6f-66aa2bad98a5';
    const uniqueId = new UniqueEntityId(validUUID);

    expect(uniqueId.id).toBe(validUUID);
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should throw error when id is invalid', () => {
    const noUUID = 'abc';

    expect(() => new UniqueEntityId(noUUID)).toThrow(InvalidUuidError);
    expect(validateSpy).toHaveBeenCalled();
  });
});
