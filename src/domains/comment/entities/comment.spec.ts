import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { Comment, PlainComment } from './comment';
import { User } from '@/domains/user/entities/user';
import RequiredDescription from '@/@seedwork/entities/required-description';

const contentStr = 'Some comment content';
const rating_id = new UniqueEntityId();
const generateUser = () => new User({ username: 'some_user' });

describe('Comment Tests', () => {
  test('comment constructor', () => {
    const user = generateUser();
    const content = new RequiredDescription(contentStr);
    let comment = new Comment({ content, user, rating_id });
    let created_at: Date;

    expect(comment.plain).toMatchObject({
      content: contentStr,
      user_id: user.id.value,
    } as PlainComment);
    expect(comment.created_at).toBeInstanceOf(Date);

    created_at = new Date();
    comment = new Comment({
      content,
      created_at,
      user,
      rating_id,
    });
    expect(comment.plain).toMatchObject({
      content: contentStr,
      created_at,
      user_id: user.id.value,
      rating_id: rating_id.value,
    } as PlainComment);

    created_at = new Date();
    comment = new Comment({
      content: new RequiredDescription('Another comment'),
      created_at,
      user,
      rating_id,
    });
    expect(comment.plain).toMatchObject({
      content: 'Another comment',
      created_at,
      rating_id: rating_id.value,
    } as PlainComment);
  });

  test('comment getters', () => {
    const user = generateUser();
    const content = new RequiredDescription(contentStr);
    let comment: Comment;
    const created_at = new Date();

    comment = new Comment({ content, user, rating_id });
    expect(comment.content.value).toBe(contentStr);
    expect(comment.created_at).toBeInstanceOf(Date);
    expect(comment.user.plain).toStrictEqual(user.plain);
    expect(comment.rating_id.value).toStrictEqual(rating_id.value);

    comment = new Comment({ content, created_at, user, rating_id });
    expect(comment.created_at).toBe(created_at);
    expect(comment.user.plain).toStrictEqual(user.plain);
  });

  test('id field', () => {
    const user = generateUser();
    const content = new RequiredDescription(contentStr);
    let comment: Comment;
    const uniqueId = new UniqueEntityId();

    comment = new Comment({ content, user, rating_id });
    expect(comment.id).toBeInstanceOf(UniqueEntityId);

    comment = new Comment({ id: uniqueId, content, user, rating_id });
    expect(comment.id).toBeInstanceOf(UniqueEntityId);
    expect(comment.id).toBe(uniqueId);
    expect(comment.id.value).toBe(uniqueId.value);
  });
});
