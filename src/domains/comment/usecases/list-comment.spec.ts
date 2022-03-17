import { ListComment } from './list-comment';
import { CommentRepository } from '../infra/comment.repository';
import { makeRandomPlainComment } from '../utils';

describe('List comment use case', () => {
  let listComment: ListComment;
  let commentRepository: CommentRepository;

  beforeEach(async () => {
    commentRepository = new CommentRepository({} as any);
    listComment = new ListComment(commentRepository);
    jest.clearAllMocks();
  });

  it('should list two', async () => {
    jest
      .spyOn(commentRepository, 'list')
      .mockImplementation(async () => [plainComment1, plainComment2]);

    const plainComment1 = makeRandomPlainComment();
    const plainComment2 = makeRandomPlainComment();

    const result = await listComment.execute();
    expect(result.length).toBe(2);
    expect(result).toMatchObject([plainComment1, plainComment2]);
  });

  it('should list empty array', async () => {
    jest.spyOn(commentRepository, 'list').mockImplementation(async () => []);

    expect(await listComment.execute()).toStrictEqual([]);
  });
});
