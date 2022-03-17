import { now } from '@/@seedwork/utils/date';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { PlainComment } from '../entities/comment';
import { DeleteComment } from './delete-comment';
import { CommentRepository } from '../infra/comment.repository';
import { PrismaService } from '@/@seedwork/infra/prisma.service';
import NotFoundError from '@/@seedwork/errors/not-found.error';
import InvalidUuidError from '@/@seedwork/errors/invalid-uuid.error';
import { makeRandomPlainComment } from '../utils';

describe('Delete comment use case', () => {
  let deleteComment: DeleteComment;
  let commentRepository: CommentRepository;

  beforeEach(async () => {
    commentRepository = new CommentRepository({} as PrismaService);
    deleteComment = new DeleteComment(commentRepository);
    jest.clearAllMocks();
  });

  it('should delete', async () => {
    jest
      .spyOn(commentRepository, 'find')
      .mockImplementation(async (id) => plainComment);
    jest
      .spyOn(commentRepository, 'delete')
      .mockImplementation(async () => plainComment);

    const plainComment = makeRandomPlainComment();

    expect(await deleteComment.execute({ id: plainComment.id })).toMatchObject(
      plainComment,
    );
  });

  it('should throw NotFoundError', async () => {
    jest.spyOn(commentRepository, 'find').mockImplementation(async () => null);
    jest
      .spyOn(commentRepository, 'delete')
      .mockImplementation(async () => makeRandomPlainComment());

    const uniqueId = new UniqueEntityId();

    expect(() =>
      deleteComment.execute({ id: uniqueId.value }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should throw InvalidUuidError', async () => {
    jest.spyOn(commentRepository, 'find').mockImplementation(async () => null);
    jest
      .spyOn(commentRepository, 'delete')
      .mockImplementation(async () => makeRandomPlainComment());

    expect(() => deleteComment.execute({ id: '' })).rejects.toBeInstanceOf(
      InvalidUuidError,
    );
  });
});
