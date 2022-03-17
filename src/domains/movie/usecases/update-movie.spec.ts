import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { PrismaService } from '@/@seedwork/infra/prisma.service';
import NotFoundError from '@/@seedwork/errors/not-found.error';
import InvalidUuidError from '@/@seedwork/errors/invalid-uuid.error';
import InvalidNameError from '@/@seedwork/errors/invalid-name.error';
import InvalidDescriptionError from '@/@seedwork/errors/invalid-description.error';
import { UpdateMovie } from './update-movie';
import { makeRandomMovie, makeRandomPlainMovie } from '../utils';
import { MovieRepository } from '../infra/movie.repository';

const newName = 'Another Name';

describe('Update movie use case', () => {
  let updateMovie: UpdateMovie;
  let movieRepository: MovieRepository;

  beforeEach(async () => {
    movieRepository = new MovieRepository({} as PrismaService);
    updateMovie = new UpdateMovie(movieRepository);
    jest.clearAllMocks();
  });

  it('should update', async () => {
    jest.spyOn(movieRepository, 'find').mockImplementation(async (id) => movie);
    jest
      .spyOn(movieRepository, 'update')
      .mockImplementation(async () => undefined);

    const movie = makeRandomMovie();

    expect(
      await updateMovie.execute({ id: movie.id.value }, { title: newName }),
    ).toBeUndefined();
  });

  it('should throw NotFoundError', async () => {
    const uniqueId = new UniqueEntityId();

    jest.spyOn(movieRepository, 'find').mockImplementation(async () => null);
    jest
      .spyOn(movieRepository, 'update')
      .mockImplementation(async () => undefined);

    expect(() =>
      updateMovie.execute({ id: uniqueId.value }, { title: newName }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should throw Invalid Errors', async () => {
    const uniqueId = new UniqueEntityId();

    jest
      .spyOn(movieRepository, 'find')
      .mockImplementation(async () => makeRandomMovie());
    jest
      .spyOn(movieRepository, 'update')
      .mockImplementation(async () => undefined);

    expect(() =>
      updateMovie.execute({ id: 'abc' }, { title: newName }),
    ).rejects.toBeInstanceOf(InvalidUuidError);

    expect(() =>
      updateMovie.execute({ id: uniqueId.value }, { title: 'a' }),
    ).rejects.toBeInstanceOf(InvalidNameError);

    expect(() =>
      updateMovie.execute({ id: uniqueId.value }, { description: 'a' }),
    ).rejects.toBeInstanceOf(InvalidDescriptionError);
  });
});
