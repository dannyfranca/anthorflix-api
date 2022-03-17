import { ListMovie } from './list-movie';
import { MovieRepository } from '../infra/movie.repository';
import { makeRandomMovie, makeRandomPlainMovie } from '../utils';

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
      .mockImplementation(async () => [movie1, movie2]);

    const movie1 = makeRandomMovie();
    const movie2 = makeRandomMovie();

    const result = await listMovie.execute();
    expect(result.length).toBe(2);
    expect(result).toMatchObject([movie1.plain, movie2.plain]);
  });

  it('should list empty array', async () => {
    jest.spyOn(movieRepository, 'list').mockImplementation(async () => []);

    expect(await listMovie.execute()).toStrictEqual([]);
  });
});
