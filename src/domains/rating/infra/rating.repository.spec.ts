import { omit } from 'lodash';

import { PrismaTestController } from '@/@seedwork/infra/prisma-test-controller';
import { PlainRating } from '../entities/rating';
import { RatingRepository } from './rating.repository';
import { makeRandomPlainRating } from '../utils';
import { MovieRepository } from '@/domains/movie/infra/movie.repository';
import { makeRandomMovie } from '@/domains/movie/utils';
import { UserRepository } from '@/domains/user/infra/user.repository';
import { longRunJestTimeout } from '@/@seedwork/config';

describe('RatingRepository', () => {
  const prismaTestController = new PrismaTestController();
  let plainRating: PlainRating;
  let ratingRepository: RatingRepository;
  let movieRepository: MovieRepository;
  let userRepository: UserRepository;

  const createMovieAndUser = async (plainRating: PlainRating) => {
    await userRepository.create(plainRating.user);
    const movie = makeRandomMovie({ id: plainRating.movie_id });
    await movieRepository.create(movie);
  };

  beforeEach(async () => {
    await prismaTestController.init();
    ratingRepository = new RatingRepository(prismaTestController.prisma);
    movieRepository = new MovieRepository(prismaTestController.prisma);
    userRepository = new UserRepository(prismaTestController.prisma);
    plainRating = makeRandomPlainRating();
    await createMovieAndUser(plainRating);
  }, longRunJestTimeout);

  afterEach(async () => {
    await prismaTestController.destroy();
  });

  it('should create, update and delete', async () => {
    let newPlainRating: PlainRating;
    let newValue: number;
    let newContent: string;
    newPlainRating = { ...plainRating };

    expect(await ratingRepository.find(plainRating.id)).toBeNull();
    expect(await ratingRepository.create(plainRating)).toMatchObject(
      plainRating,
    );
    expect(await ratingRepository.find(plainRating.id)).toMatchObject(
      plainRating,
    );

    newValue = newPlainRating.value === 5 ? 6 : 5;
    newPlainRating = { ...newPlainRating, value: newValue };
    expect(
      await ratingRepository.update(
        { id: plainRating.id },
        { value: newValue },
      ),
    ).toMatchObject(newPlainRating);
    expect(await ratingRepository.find(plainRating.id)).toMatchObject(
      newPlainRating,
    );

    newContent = 'Another Desc';
    newPlainRating = { ...newPlainRating, content: newContent };
    expect(
      await ratingRepository.update(
        { id: plainRating.id },
        { content: newContent },
      ),
    ).toMatchObject(newPlainRating);
    expect(await ratingRepository.find(plainRating.id)).toMatchObject(
      newPlainRating,
    );

    expect(
      await ratingRepository.update(
        { id: plainRating.id },
        { value: plainRating.value, content: plainRating.content as string },
      ),
    ).toMatchObject(plainRating);
    expect(await ratingRepository.find(plainRating.id)).toMatchObject(
      plainRating,
    );

    const deletedRating = await ratingRepository.delete(plainRating.id);
    expect(deletedRating).toMatchObject(omit(plainRating, 'deleted_at'));
    expect(deletedRating.deleted_at).toBeInstanceOf(Date);
    expect(await ratingRepository.find(plainRating.id)).toBeNull();
  });

  it('should create and list two ratings', async () => {
    const plainRating2 = makeRandomPlainRating();
    await createMovieAndUser(plainRating2);

    await ratingRepository.create(plainRating);
    await ratingRepository.create(plainRating2);

    expect(await ratingRepository.list()).toMatchObject([
      plainRating,
      plainRating2,
    ]);
  });
});
