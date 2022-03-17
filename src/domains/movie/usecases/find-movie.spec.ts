import { PlainMovie } from '../entities/movie';
import { FindMovie } from './find-movie';
import { MovieRepository } from '../infra/movie.repository';
import { makeRandomPlainMovie } from '../utils';
import InvalidUuidError from '@/@seedwork/errors/invalid-uuid.error';
import NotFoundError from '@/@seedwork/errors/not-found.error';

describe('Find movie use case', () => {
  let findMovie: FindMovie;
  let movieRepository: MovieRepository;
  let plainMovie: PlainMovie;

  beforeEach(async () => {
    movieRepository = new MovieRepository({} as any);
    findMovie = new FindMovie(movieRepository);
    jest.clearAllMocks();
    plainMovie = makeRandomPlainMovie();
  });

  it('should find movie', async () => {
    jest
      .spyOn(movieRepository, 'find')
      .mockImplementation(async () => plainMovie);

    const result = await findMovie.execute(plainMovie.id);
    expect(result).toStrictEqual(plainMovie);
  });

  it('should not find movie', async () => {
    jest.spyOn(movieRepository, 'find').mockImplementation(async () => null);

    expect(() => findMovie.execute(plainMovie.id)).rejects.toThrow(
      NotFoundError,
    );
  });

  it('should throw InvalidUniqueIdError', async () => {
    jest
      .spyOn(movieRepository, 'find')
      .mockImplementation(async () => plainMovie);

    expect(() => findMovie.execute('abc')).rejects.toThrow(InvalidUuidError);
  });
});
