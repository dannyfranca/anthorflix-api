import { PrismaService } from '@/@seedwork/infra/prisma.service';
import InvalidDescriptionError from '@/@seedwork/errors/invalid-description.error';
import { MovieRepository } from '@/domains/movie/infra/movie.repository';
import { UserRepository } from '@/domains/user/infra/user.repository';
import NotFoundError from '@/@seedwork/errors/not-found.error';
import { makeRandomPlainMovie } from '@/domains/movie/utils';
import { makeRandomPlainUser } from '@/domains/user/utils';
import { PlainRating } from '../entities/rating';
import { CreateRating } from './create-rating';
import { RatingRepository } from '../infra/rating.repository';
import { makeRandomPlainRating } from '../utils';

describe('Create rating use case', () => {
  let createRating: CreateRating;
  let ratingRepository: RatingRepository;
  let movieRepository: MovieRepository;
  let userRepository: UserRepository;
  let plainRating: PlainRating;

  beforeEach(async () => {
    ratingRepository = new RatingRepository({} as PrismaService);
    movieRepository = new MovieRepository({} as PrismaService);
    userRepository = new UserRepository({} as PrismaService);
    createRating = new CreateRating(
      ratingRepository,
      movieRepository,
      userRepository,
    );
    plainRating = makeRandomPlainRating();
    jest.clearAllMocks();
  });

  it('should create', async () => {
    jest
      .spyOn(movieRepository, 'find')
      .mockImplementation(async () => makeRandomPlainMovie());
    jest
      .spyOn(userRepository, 'find')
      .mockImplementation(async () => makeRandomPlainUser());
    jest
      .spyOn(ratingRepository, 'create')
      .mockImplementation(async () => plainRating);

    expect(await createRating.execute(plainRating)).toMatchObject(plainRating);
  });

  it('should throw Invalid Errors', () => {
    jest
      .spyOn(movieRepository, 'find')
      .mockImplementation(async () => makeRandomPlainMovie());
    jest
      .spyOn(userRepository, 'find')
      .mockImplementation(async () => makeRandomPlainUser());
    jest
      .spyOn(ratingRepository, 'create')
      .mockImplementation(async () => makeRandomPlainRating());

    expect(() =>
      createRating.execute({ ...plainRating, content: 'a' }),
    ).rejects.toBeInstanceOf(InvalidDescriptionError);
  });

  it('should throw NotFoundError when movie does not exist', () => {
    jest.spyOn(movieRepository, 'find').mockImplementation(async () => null);

    expect(() =>
      createRating.execute({ ...plainRating }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should throw NotFoundError when user does not exist', () => {
    jest
      .spyOn(movieRepository, 'find')
      .mockImplementation(async () => makeRandomPlainMovie());
    jest.spyOn(userRepository, 'find').mockImplementation(async () => null);

    expect(() =>
      createRating.execute({ ...plainRating }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
