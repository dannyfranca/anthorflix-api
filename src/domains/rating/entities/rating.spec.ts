import { omit } from 'lodash';

import UniqueEntityId from '@/@seedwork/domain/unique-entity-id';
import { Rating, RatingProperties } from './rating';
import { User } from '@/domains/user/entities/user';

const content = 'Some rating content';
const generateUser = () => new User({ username: 'some_user' });

describe('Rating Tests', () => {
  const validateSpy = jest.spyOn(Rating.prototype as any, 'validate');

  beforeEach(() => validateSpy.mockClear());
  test('rating constructor', () => {
    const user = generateUser();
    let rating = new Rating({ value: 5, user });
    let created_at: Date;

    const props = omit(rating.props, 'created_at');
    expect(props).toStrictEqual({
      value: 5,
      content: null,
      user,
    } as RatingProperties);
    expect(rating.created_at).toBeInstanceOf(Date);

    created_at = new Date();
    rating = new Rating({
      content,
      value: 4,
      created_at,
      user,
    });
    expect(rating.props).toStrictEqual({
      content,
      value: 4,
      created_at,
      user,
    } as RatingProperties);

    created_at = new Date();
    rating = new Rating({
      content: 'Another content',
      value: 5,
      created_at,
      user,
    });
    expect(rating.props).toMatchObject({
      content: 'Another content',
      value: 5,
      created_at,
    } as RatingProperties);
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should throw error on contructor', () => {
    const user = generateUser();
    expect(() => new Rating({ value: 11, user }));
    expect(() => new Rating({ value: 3.5, user }));
    expect(() => new Rating({ value: -1, user }));
  });

  test('rating getters', () => {
    const user = generateUser();
    let rating: Rating;
    const created_at = new Date();

    rating = new Rating({ content, value: 6, user });
    expect(rating.content).toBe(content);
    expect(rating.value).toBe(6);
    expect(rating.user.props).toStrictEqual(user.props);
    expect(rating.created_at).toBeInstanceOf(Date);

    rating = new Rating({ value: 4, created_at, user });
    expect(rating.content).toBeNull();
    expect(rating.value).toBe(4);
    expect(rating.user.props).toStrictEqual(user.props);
    expect(rating.created_at).toBe(created_at);
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  test('id field', () => {
    const user = generateUser();
    let rating: Rating;
    const uniqueId = new UniqueEntityId();

    rating = new Rating({ value: 4, user });
    expect(rating.id).toBeInstanceOf(UniqueEntityId);

    rating = new Rating({ value: 4, user }, uniqueId);
    expect(rating.id).toBeInstanceOf(UniqueEntityId);
    expect(rating.id).toBe(uniqueId);
    expect(rating.id.id).toBe(uniqueId.id);
  });
});
