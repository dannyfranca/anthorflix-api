import { CreateMovie } from './create-movie';
import { MovieRepository } from '../infra/movie.repository';
import { PrismaService } from '@/@seedwork/infra/prisma.service';
import InvalidNameError from '@/@seedwork/errors/invalid-name.error';
import { makeRandomPlainMovie } from '../utils';
import InvalidDescriptionError from '@/@seedwork/errors/invalid-description.error';

describe('Create movie use case', () => {
  let createMovie: CreateMovie;
  let movieRepository: MovieRepository;

  beforeEach(async () => {
    movieRepository = new MovieRepository({} as PrismaService);
    createMovie = new CreateMovie(movieRepository);
    jest.clearAllMocks();
  });

  it('should create', async () => {
    jest
      .spyOn(movieRepository, 'create')
      .mockImplementation(async () => plainMovie);

    const plainMovie = makeRandomPlainMovie();

    expect(await createMovie.execute(plainMovie)).toMatchObject(plainMovie);
  });

  it('should throw Errors', () => {
    jest
      .spyOn(movieRepository, 'create')
      .mockImplementation(async () => makeRandomPlainMovie());

    const plainMovie = makeRandomPlainMovie();

    expect(() =>
      createMovie.execute({ ...plainMovie, title: 'a' }),
    ).rejects.toBeInstanceOf(InvalidNameError);

    expect(() =>
      createMovie.execute({ ...plainMovie, description: 'a' }),
    ).rejects.toBeInstanceOf(InvalidDescriptionError);
  });
});
