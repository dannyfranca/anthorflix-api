import { omit } from 'lodash';

import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { Comment, CommentProperties } from './comment';
import { User } from '@/domains/user/entities/user';

const content = 'Some comment content';
const generateUser = () => new User({ username: 'some_user' });

describe('Comment Tests', () => {
  test('comment constructor', () => {
    const user = generateUser();
    let comment = new Comment({ content, user });
    let created_at: Date;

    const props = omit(comment.props, 'created_at');
    expect(props).toStrictEqual({
      content,
      user,
    } as CommentProperties);
    expect(comment.created_at).toBeInstanceOf(Date);

    created_at = new Date();
    comment = new Comment({
      content: content,
      created_at,
      user,
    });
    expect(comment.props).toStrictEqual({
      content,
      created_at,
      user,
    } as CommentProperties);

    created_at = new Date();
    comment = new Comment({ content: 'Another comment', created_at, user });
    expect(comment.props).toMatchObject({
      content: 'Another comment',
      created_at,
    } as CommentProperties);
  });

  test('comment getters', () => {
    const user = generateUser();
    let comment: Comment;
    const created_at = new Date();

    comment = new Comment({ content: content, user });
    expect(comment.content).toBe(content);
    expect(comment.created_at).toBeInstanceOf(Date);
    expect(comment.user.props).toStrictEqual(user.props);

    comment = new Comment({ content: content, created_at, user });
    expect(comment.created_at).toBe(created_at);
    expect(comment.user.props).toStrictEqual(user.props);
  });

  test('id field', () => {
    const user = generateUser();
    let comment: Comment;
    const uniqueId = new UniqueEntityId();

    comment = new Comment({ content: content, user });
    expect(comment.id).toBeInstanceOf(UniqueEntityId);

    comment = new Comment({ content: content, user }, uniqueId);
    expect(comment.id).toBeInstanceOf(UniqueEntityId);
    expect(comment.id).toBe(uniqueId);
    expect(comment.id.value).toBe(uniqueId.value);
  });
});
