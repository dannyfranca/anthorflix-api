import { omit } from 'lodash';

import UniqueEntityId from '@/@seedwork/domain/unique-entity-id';
import { Rating, RatingProperties } from './rating';
import { User } from '@/domains/user/entities/user';
import { Comment } from '@/domains/comment/entities/comment';

const content = 'Some rating content';
const generateUser = () => new User({ username: 'rating_user' });
const generateComments = () => [
  new Comment({
    content: 'Comment form user 1',
    user: new User({ username: 'comment_user1' }),
  }),
  new Comment({
    content: 'Comment form user 2',
    user: new User({ username: 'comment_user2' }),
  }),
];

describe('Rating Tests', () => {
  const validateSpy = jest.spyOn(Rating.prototype as any, 'validate');

  beforeEach(() => validateSpy.mockClear());
  test('rating constructor', () => {
    const user = generateUser();
    const comments = generateComments();
    let rating = new Rating({ value: 5, user, comments });
    let created_at: Date;

    const props = omit(rating.props, 'created_at');
    expect(props).toStrictEqual({
      value: 5,
      content: null,
      user,
      comments,
    } as RatingProperties);
    expect(rating.created_at).toBeInstanceOf(Date);

    created_at = new Date();
    rating = new Rating({
      content,
      value: 4,
      created_at,
      user,
      comments,
    });
    expect(rating.props).toStrictEqual({
      content,
      value: 4,
      created_at,
      user,
      comments,
    } as RatingProperties);

    created_at = new Date();
    rating = new Rating({
      content: 'Another content',
      value: 5,
      created_at,
      user,
      comments,
    });
    expect(rating.props).toMatchObject({
      content: 'Another content',
      value: 5,
      created_at,
    } as RatingProperties);
    expect(validateSpy).toHaveBeenCalled();
  });

  test('rating getters', () => {
    const user = generateUser();
    const comments = generateComments();
    let rating: Rating;
    const created_at = new Date();

    rating = new Rating({ content, value: 6, user, comments });
    expect(rating.content).toBe(content);
    expect(rating.value).toBe(6);
    expect(rating.user.props).toStrictEqual(user.props);
    expect(rating.created_at).toBeInstanceOf(Date);

    rating = new Rating({ value: 4, created_at, user, comments });
    expect(rating.content).toBeNull();
    expect(rating.value).toBe(4);
    expect(rating.user.props).toStrictEqual(user.props);
    expect(rating.created_at).toBe(created_at);
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  test('id field', () => {
    const user = generateUser();
    const comments = generateComments();
    let rating: Rating;
    const uniqueId = new UniqueEntityId();

    rating = new Rating({ value: 4, user, comments });
    expect(rating.id).toBeInstanceOf(UniqueEntityId);

    rating = new Rating({ value: 4, user, comments }, uniqueId);
    expect(rating.id).toBeInstanceOf(UniqueEntityId);
    expect(rating.id).toBe(uniqueId);
    expect(rating.id.id).toBe(uniqueId.id);
  });

  it('should throw error on contructor', () => {
    const user = generateUser();
    const comments = generateComments();
    expect(() => new Rating({ value: 11, user, comments }));
    expect(() => new Rating({ value: 3.5, user, comments }));
    expect(() => new Rating({ value: -1, user, comments }));
  });

  it('should count comments', () => {
    const user = generateUser();
    const comments = generateComments();
    const rating = new Rating({ value: 9, user, comments });
    expect(rating.commentCount()).toBe(2);
  });
});
