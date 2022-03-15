import { ListMovie } from './list-movie';
import { MovieRepository } from '../infra/movie.repository';
import { makeRandomPlainMovie } from '../utils';

describe('List movie use case', () => {
  let listMovie: ListMovie;
  let movieRepository: MovieRepository;

  beforeEach(async () => {
    movieRepository = new MovieRepository({} as any);
    listMovie = new ListMovie(movieRepository);
    jest.clearAllMocks();
  });

  it('should list two', async () => {
    jest
      .spyOn(movieRepository, 'list')
      .mockImplementation(async () => [plainMovie1, plainMovie2]);

    const plainMovie1 = makeRandomPlainMovie();
    const plainMovie2 = makeRandomPlainMovie();

    const result = await listMovie.execute();
    expect(result.length).toBe(2);
    expect(result).toMatchObject([plainMovie1, plainMovie2]);
  });

  it('should list empty array', async () => {
    jest.spyOn(movieRepository, 'list').mockImplementation(async () => []);

    expect(await listMovie.execute()).toStrictEqual([]);
  });
});
