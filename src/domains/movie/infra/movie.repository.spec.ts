import { PrismaTestController } from '@/@seedwork/infra/prisma-test-controller';
import { Movie } from '../entities/movie';
import { MovieRepository } from './movie.repository';
import { makeRandomMovie } from '../utils';
import { longRunJestTimeout } from '@/@seedwork/config';

describe('MovieRepository', () => {
  const prismaTestController = new PrismaTestController();
  let movieRepository: MovieRepository;

  beforeEach(async () => {
    await prismaTestController.init();
    movieRepository = new MovieRepository(prismaTestController.prisma);
  }, longRunJestTimeout);

  afterEach(async () => {
    await prismaTestController.destroy();
  });

  it('should create, update and delete', async () => {
    let newTitle: string;
    let newDesc: string;
    let newYear: number;
    const movie: Movie = makeRandomMovie();

    expect(await movieRepository.find(movie.id)).toBeNull();
    await movieRepository.create(movie);
    expect(await movieRepository.find(movie.id)).toStrictEqual(movie);

    newTitle = 'Another Name';
    movie.title.changeName(newTitle);
    await movieRepository.update(movie);
    expect(await movieRepository.find(movie.id)).toStrictEqual(movie);

    newDesc = 'Another Desc';
    newYear = 2014;
    movie.description.changeDescription(newTitle);
    movie.changeYearLaunched(2014);
    await movieRepository.update(movie);
    expect(await movieRepository.find(movie.id)).toStrictEqual(movie);

    await movieRepository.delete(movie.id);
    expect(await movieRepository.find(movie.id)).toBeNull();
  });

  it('should create and list two movies', async () => {
    const movie1 = makeRandomMovie();
    const movie2 = makeRandomMovie();

    await movieRepository.create(movie1);
    await movieRepository.create(movie2);

    expect(await movieRepository.list()).toStrictEqual([movie1, movie2]);
  });
});
