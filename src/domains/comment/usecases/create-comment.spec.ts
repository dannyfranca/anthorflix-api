import InvalidDescriptionError from '@/@seedwork/errors/invalid-description.error';
import NotFoundError from '@/@seedwork/errors/not-found.error';
import { UserRepository } from '@/domains/user/infra/user.repository';
import { makeRandomPlainUser } from '@/domains/user/utils';
import { RatingRepository } from '@/domains/rating/infra/rating.repository';
import { makeRandomPlainRating } from '@/domains/rating/utils';
import { PlainComment } from '../entities/comment';
import { CreateComment } from './create-comment';
import { CommentRepository } from '../infra/comment.repository';
import { makeRandomPlainComment } from '../utils';

describe('Create comment use case', () => {
  let createComment: CreateComment;
  let commentRepository: CommentRepository;
  let ratingRepository: RatingRepository;
  let userRepository: UserRepository;
  let plainComment: PlainComment;

  beforeEach(async () => {
    commentRepository = new CommentRepository({} as any);
    ratingRepository = new RatingRepository({} as any);
    userRepository = new UserRepository({} as any);
    createComment = new CreateComment(
      commentRepository,
      ratingRepository,
      userRepository,
    );
    plainComment = makeRandomPlainComment();
    jest.clearAllMocks();
  });

  it('should create', async () => {
    jest
      .spyOn(ratingRepository, 'find')
      .mockImplementation(async () => makeRandomPlainRating());
    jest
      .spyOn(userRepository, 'find')
      .mockImplementation(async () => makeRandomPlainUser());
    jest
      .spyOn(commentRepository, 'create')
      .mockImplementation(async () => plainComment);

    expect(await createComment.execute(plainComment)).toMatchObject(
      plainComment,
    );
  });

  it('should throw Invalid Errors', () => {
    jest
      .spyOn(ratingRepository, 'find')
      .mockImplementation(async () => makeRandomPlainRating());
    jest
      .spyOn(userRepository, 'find')
      .mockImplementation(async () => makeRandomPlainUser());
    jest
      .spyOn(commentRepository, 'create')
      .mockImplementation(async () => makeRandomPlainComment());

    expect(() =>
      createComment.execute({ ...plainComment, content: 'a' }),
    ).rejects.toBeInstanceOf(InvalidDescriptionError);
  });

  it('should throw NotFoundError when movie does not exist', () => {
    jest.spyOn(ratingRepository, 'find').mockImplementation(async () => null);

    expect(() =>
      createComment.execute({ ...plainComment }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should throw NotFoundError when user does not exist', () => {
    jest
      .spyOn(ratingRepository, 'find')
      .mockImplementation(async () => makeRandomPlainRating());
    jest.spyOn(userRepository, 'find').mockImplementation(async () => null);

    expect(() =>
      createComment.execute({ ...plainComment }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
