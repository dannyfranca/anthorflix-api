import { omit } from 'lodash';

import UniqueEntityId from '@/@seedwork/domain/unique-entity-id';
import { Comment, CommentProperties } from './comment';

const content = 'Some comment content';

describe('Comment Tests', () => {
  test('comment constructor', () => {
    let comment = new Comment({ content });
    let created_at: Date;

    const props = omit(comment.props, 'created_at');
    expect(props).toStrictEqual({
      content,
    } as CommentProperties);
    expect(comment.created_at).toBeInstanceOf(Date);

    created_at = new Date();
    comment = new Comment({
      content: content,
      created_at,
    });
    expect(comment.props).toStrictEqual({
      content,
      created_at,
    } as CommentProperties);

    created_at = new Date();
    comment = new Comment({ content: 'Another comment', created_at });
    expect(comment.props).toMatchObject({
      content: 'Another comment',
      created_at,
    } as CommentProperties);
  });

  test('comment getters', () => {
    let comment: Comment;
    const created_at = new Date();

    comment = new Comment({ content: content });
    expect(comment.content).toBe(content);
    expect(comment.created_at).toBeInstanceOf(Date);

    comment = new Comment({ content: content, created_at });
    expect(comment.created_at).toBe(created_at);
  });

  test('id field', () => {
    let comment: Comment;
    const uniqueId = new UniqueEntityId();

    comment = new Comment({ content: content });
    expect(comment.id).toBeInstanceOf(UniqueEntityId);

    comment = new Comment({ content: content }, uniqueId);
    expect(comment.id).toBeInstanceOf(UniqueEntityId);
    expect(comment.id).toBe(uniqueId);
    expect(comment.id.id).toBe(uniqueId.id);
  });
});
