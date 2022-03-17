import { CreateMovie } from './create-movie';
import { MovieRepository } from '../infra/movie.repository';
import { PrismaService } from '@/@seedwork/infra/prisma.service';
import InvalidNameError from '@/@seedwork/errors/invalid-name.error';
import { makeRandomMovie } from '../utils';
import InvalidDescriptionError from '@/@seedwork/errors/invalid-description.error';

describe('Create movie use case', () => {
  let createMovie: CreateMovie;
  let movieRepository: MovieRepository;

  beforeEach(async () => {
    movieRepository = new MovieRepository({} as any);
    createMovie = new CreateMovie(movieRepository);
    jest.clearAllMocks();
  });

  it('should create', async () => {
    jest
      .spyOn(movieRepository, 'create')
      .mockImplementation(async () => undefined);
    jest.spyOn(movieRepository, 'find').mockImplementation(async () => movie);

    const movie = makeRandomMovie();
    const plainMovie = movie.plain;

    expect(await createMovie.execute(plainMovie)).toMatchObject(plainMovie);
  });

  it('should throw Errors', () => {
    jest
      .spyOn(movieRepository, 'create')
      .mockImplementation(async () => undefined);

    const movie = makeRandomMovie();
    const plainMovie = movie.plain;

    expect(() =>
      createMovie.execute({ ...plainMovie, title: 'a' }),
    ).rejects.toBeInstanceOf(InvalidNameError);

    expect(() =>
      createMovie.execute({ ...plainMovie, description: 'a' }),
    ).rejects.toBeInstanceOf(InvalidDescriptionError);
  });
});
