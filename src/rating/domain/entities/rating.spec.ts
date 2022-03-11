import { omit } from 'lodash';

import UniqueEntityId from '@/@seedwork/domain/unique-entity-id';
import { Rating, RatingProperties } from './rating';

const content = 'Some rating content';

describe('Rating Tests', () => {
  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

  beforeEach(() => validateSpy.mockClear());
  test('rating constructor', () => {
    let rating = new Rating({ value: 5 });
    let created_at: Date;

    const props = omit(rating.props, 'created_at');
    expect(props).toStrictEqual({
      value: 5,
      content: null,
    } as RatingProperties);
    expect(rating.created_at).toBeInstanceOf(Date);

    created_at = new Date();
    rating = new Rating({
      content,
      value: 4,
      created_at,
    });
    expect(rating.props).toStrictEqual({
      content,
      value: 4,
      created_at,
    } as RatingProperties);

    created_at = new Date();
    rating = new Rating({ content: 'Another content', value: 5, created_at });
    expect(rating.props).toMatchObject({
      content: 'Another content',
      value: 5,
      created_at,
    } as RatingProperties);
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should throw error on contructor', () => {
    expect(() => new Rating({ value: 11 }));
    expect(() => new Rating({ value: -1 }));
  });

  test('rating getters', () => {
    let rating: Rating;
    const created_at = new Date();

    rating = new Rating({ content, value: 6 });
    expect(rating.content).toBe(content);
    expect(rating.value).toBe(6);
    expect(rating.created_at).toBeInstanceOf(Date);

    rating = new Rating({ value: 4, created_at });
    expect(rating.content).toBeNull();
    expect(rating.value).toBe(4);
    expect(rating.created_at).toBe(created_at);
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  test('id field', () => {
    let rating: Rating;
    const uniqueId = new UniqueEntityId();

    rating = new Rating({ value: 4 });
    expect(rating.id).toBeInstanceOf(UniqueEntityId);

    rating = new Rating({ value: 4 }, uniqueId);
    expect(rating.id).toBeInstanceOf(UniqueEntityId);
    expect(rating.id).toBe(uniqueId);
    expect(rating.id.id).toBe(uniqueId.id);
  });
});
