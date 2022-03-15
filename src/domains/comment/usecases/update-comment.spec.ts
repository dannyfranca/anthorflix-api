import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import NotFoundError from '@/@seedwork/errors/not-found.error';
import InvalidUuidError from '@/@seedwork/errors/invalid-uuid.error';
import InvalidDescriptionError from '@/@seedwork/errors/invalid-description.error';
import { randomDesc } from '@/@seedwork/utils/mock';
import { UserRepository } from '@/domains/user/infra/user.repository';
import { makeRandomPlainUser } from '@/domains/user/utils';
import { UpdateComment } from './update-comment';
import { makeRandomPlainComment } from '../utils';
import { CommentRepository } from '../infra/comment.repository';
import { PlainComment } from '../entities/comment';

const newContent = randomDesc();

describe('Update comment use case', () => {
  let updateComment: UpdateComment;
  let commentRepository: CommentRepository;
  let userRepository: UserRepository;
  let plainComment: PlainComment;

  beforeEach(async () => {
    commentRepository = new CommentRepository({} as any);
    userRepository = new UserRepository({} as any);
    updateComment = new UpdateComment(commentRepository, userRepository);
    plainComment = makeRandomPlainComment();
    jest.clearAllMocks();
    jest
      .spyOn(userRepository, 'find')
      .mockImplementation(async (id) => makeRandomPlainUser());
  });

  it('should update', async () => {
    jest
      .spyOn(commentRepository, 'find')
      .mockImplementation(async (id) => plainComment);
    jest
      .spyOn(commentRepository, 'update')
      .mockImplementation(async () => plainComment);

    expect(
      await updateComment.execute(
        { id: plainComment.id },
        { content: newContent },
      ),
    ).toMatchObject({ ...plainComment });
  });

  it('should throw NotFoundError', async () => {
    const uniqueId = new UniqueEntityId();

    jest.spyOn(commentRepository, 'find').mockImplementation(async () => null);
    jest
      .spyOn(commentRepository, 'update')
      .mockImplementation(async () => makeRandomPlainComment());

    expect(() =>
      updateComment.execute({ id: uniqueId.value }, { content: newContent }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should throw Invalid Errors', async () => {
    const uniqueId = new UniqueEntityId();

    jest
      .spyOn(commentRepository, 'find')
      .mockImplementation(async () => makeRandomPlainComment());
    jest
      .spyOn(commentRepository, 'update')
      .mockImplementation(async () => makeRandomPlainComment());

    expect(() =>
      updateComment.execute({ id: 'abc' }, { content: newContent }),
    ).rejects.toBeInstanceOf(InvalidUuidError);

    expect(() =>
      updateComment.execute(
        { id: uniqueId.value },
        { content: randomDesc(5000) },
      ),
    ).rejects.toBeInstanceOf(InvalidDescriptionError);
  });
});
