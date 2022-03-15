import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { PlainRating, Rating } from './rating';
import { User } from '@/domains/user/entities/user';
import Description from '@/@seedwork/entities/description';

const contentStr = 'Some rating content';
const generateUser = () => new User({ username: 'rating_user' });
const generateUniqueId = () => new UniqueEntityId();

describe('Rating Tests', () => {
  const validateSpy = jest.spyOn(Rating.prototype as any, 'validate');

  beforeEach(() => validateSpy.mockClear());
  test('rating constructor', () => {
    const user = generateUser();
    const movie_id = generateUniqueId();
    let rating = new Rating({ value: 5, user, movie_id });
    let created_at: Date;

    console.log(rating.plain);
    expect(rating.plain).toMatchObject({
      value: 5,
      content: null,
      user: user.plain,
      movie_id: movie_id.value,
      user_id: user.id.value,
    } as PlainRating);
    expect(rating.created_at).toBeInstanceOf(Date);

    created_at = new Date();
    rating = new Rating({
      content: new Description(contentStr),
      value: 4,
      created_at,
      user,
      movie_id,
    });
    expect(rating.plain).toMatchObject({
      content: contentStr,
      value: 4,
      created_at,
      movie_id: movie_id.value,
      user_id: user.id.value,
      user: user.plain,
    } as PlainRating);

    created_at = new Date();
    rating = new Rating({
      content: new Description('Another content'),
      value: 5,
      created_at,
      user,
      movie_id,
    });
    expect(rating.plain).toMatchObject({
      content: 'Another content',
      value: 5,
      created_at,
    } as PlainRating);
    expect(validateSpy).toHaveBeenCalled();
  });

  test('rating getters', () => {
    const user = generateUser();
    const movie_id = generateUniqueId();
    let rating: Rating;
    const created_at = new Date();
    const deleted_at = new Date();

    rating = new Rating({
      content: new Description(contentStr),
      value: 6,
      user,
      movie_id,
    });
    expect(rating.content?.value).toBe(contentStr);
    expect(rating.value).toBe(6);
    expect(rating.user.plain).toStrictEqual(user.plain);
    expect(rating.movie_id.value).toStrictEqual(movie_id.value);
    expect(rating.created_at).toBeInstanceOf(Date);
    expect(rating.deleted_at).toBeNull();

    rating = new Rating({ value: 4, created_at, user, movie_id, deleted_at });
    expect(rating.content).toBeNull();
    expect(rating.value).toBe(4);
    expect(rating.user.plain).toStrictEqual(user.plain);
    expect(rating.created_at).toBe(created_at);
    expect(rating.deleted_at).toBeInstanceOf(Date);
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  test('id field', () => {
    const user = generateUser();
    const movie_id = generateUniqueId();
    let rating: Rating;
    const uniqueId = new UniqueEntityId();

    rating = new Rating({ value: 4, user, movie_id });
    expect(rating.id).toBeInstanceOf(UniqueEntityId);

    rating = new Rating({ id: uniqueId, value: 4, user, movie_id });
    expect(rating.id).toBeInstanceOf(UniqueEntityId);
    expect(rating.id).toBe(uniqueId);
    expect(rating.id.value).toBe(uniqueId.value);
  });

  it('should throw error on contructor', () => {
    const user = generateUser();
    const movie_id = generateUniqueId();
    expect(() => new Rating({ value: 11, user, movie_id }));
    expect(() => new Rating({ value: 3.5, user, movie_id }));
    expect(() => new Rating({ value: -1, user, movie_id }));
  });
});
