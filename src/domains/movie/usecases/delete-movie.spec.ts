import { now } from '@/@seedwork/utils/date';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { PlainMovie } from '../entities/movie';
import { DeleteMovie } from './delete-movie';
import { MovieRepository } from '../infra/movie.repository';
import { PrismaService } from '@/@seedwork/infra/prisma.service';
import NotFoundError from '@/@seedwork/errors/not-found.error';
import InvalidUuidError from '@/@seedwork/errors/invalid-uuid.error';
import { makeRandomMovie } from '../utils';

describe('Delete movie use case', () => {
  let deleteMovie: DeleteMovie;
  let movieRepository: MovieRepository;

  beforeEach(async () => {
    movieRepository = new MovieRepository({} as PrismaService);
    deleteMovie = new DeleteMovie(movieRepository);
    jest.clearAllMocks();
  });

  it('should delete', async () => {
    jest.spyOn(movieRepository, 'find').mockImplementation(async (id) => movie);
    jest
      .spyOn(movieRepository, 'delete')
      .mockImplementation(async () => undefined);

    const movie = makeRandomMovie();
    const plainMovie = movie.plain;

    expect(await deleteMovie.execute({ id: plainMovie.id })).toBeUndefined();
  });

  it('should throw NotFoundError', async () => {
    jest.spyOn(movieRepository, 'find').mockImplementation(async () => null);
    jest
      .spyOn(movieRepository, 'delete')
      .mockImplementation(async () => undefined);

    const uniqueId = new UniqueEntityId();

    expect(() =>
      deleteMovie.execute({ id: uniqueId.value }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should throw InvalidUuidError', async () => {
    jest.spyOn(movieRepository, 'find').mockImplementation(async () => null);
    jest
      .spyOn(movieRepository, 'delete')
      .mockImplementation(async () => undefined);

    expect(() => deleteMovie.execute({ id: '' })).rejects.toBeInstanceOf(
      InvalidUuidError,
    );
  });
});
