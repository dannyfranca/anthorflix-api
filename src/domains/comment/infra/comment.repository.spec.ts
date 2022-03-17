import { omit } from 'lodash';

import { PrismaTestController } from '@/@seedwork/infra/prisma-test-controller';
import { longRunJestTimeout } from '@/@seedwork/config';
import { MovieRepository } from '@/domains/movie/infra/movie.repository';
import { makeRandomMovie, makeRandomPlainMovie } from '@/domains/movie/utils';
import { UserRepository } from '@/domains/user/infra/user.repository';
import { RatingRepository } from '@/domains/rating/infra/rating.repository';
import { makeRandomPlainRating } from '@/domains/rating/utils';
import { PlainComment } from '../entities/comment';
import { CommentRepository } from './comment.repository';
import { makeRandomPlainComment } from '../utils';

describe('CommentRepository', () => {
  const prismaTestController = new PrismaTestController();
  let plainComment: PlainComment;
  let commentRepository: CommentRepository;
  let movieRepository: MovieRepository;
  let ratingRepository: RatingRepository;
  let userRepository: UserRepository;

  const createMovieAndUser = async (plainComment: PlainComment) => {
    const plainRating = makeRandomPlainRating();
    plainRating.id = plainComment.rating_id;

    await userRepository.create(plainComment.user);
    await userRepository.create(plainRating.user);
    const movie = makeRandomMovie({ id: plainRating.movie_id });
    await movieRepository.create(movie);
    await ratingRepository.create(plainRating);
  };

  beforeEach(async () => {
    await prismaTestController.init();
    commentRepository = new CommentRepository(prismaTestController.prisma);
    movieRepository = new MovieRepository(prismaTestController.prisma);
    ratingRepository = new RatingRepository(prismaTestController.prisma);
    userRepository = new UserRepository(prismaTestController.prisma);
    plainComment = makeRandomPlainComment();
    await createMovieAndUser(plainComment);
  }, longRunJestTimeout);

  afterEach(async () => {
    await prismaTestController.destroy();
  });

  it('should create, update and delete', async () => {
    let newPlainComment: PlainComment;
    let newContent: string;
    newPlainComment = { ...plainComment };

    expect(await commentRepository.find(plainComment.id)).toBeNull();
    expect(await commentRepository.create(plainComment)).toMatchObject(
      plainComment,
    );
    expect(await commentRepository.find(plainComment.id)).toMatchObject(
      plainComment,
    );

    newContent = 'Another Desc';
    newPlainComment = { ...newPlainComment, content: newContent };
    expect(
      await commentRepository.update(
        { id: plainComment.id },
        { content: newContent },
      ),
    ).toMatchObject(newPlainComment);
    expect(await commentRepository.find(plainComment.id)).toMatchObject(
      newPlainComment,
    );

    expect(
      await commentRepository.update(
        { id: plainComment.id },
        { content: plainComment.content },
      ),
    ).toMatchObject(plainComment);
    expect(await commentRepository.find(plainComment.id)).toMatchObject(
      plainComment,
    );

    const deletedComment = await commentRepository.delete(plainComment.id);
    expect(deletedComment).toMatchObject(omit(plainComment, 'deleted_at'));
    expect(deletedComment.deleted_at).toBeInstanceOf(Date);
    expect(await commentRepository.find(plainComment.id)).toBeNull();
  });

  it('should create and list two comments', async () => {
    const plainComment2 = makeRandomPlainComment();
    await createMovieAndUser(plainComment2);

    await commentRepository.create(plainComment);
    await commentRepository.create(plainComment2);

    expect(await commentRepository.list()).toMatchObject([
      plainComment,
      plainComment2,
    ]);
  });
});
