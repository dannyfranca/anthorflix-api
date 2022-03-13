import { now } from '@/@seedwork/utils/date';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { PlainGenre } from '../entities/genre';
import { DeleteGenre } from './delete-genre';
import { GenreRepository } from '../infra/genre.repository';
import { PrismaService } from '@/@seedwork/infra/prisma.service';
import NotFoundError from '@/@seedwork/errors/not-found.error';
import InvalidUuidError from '@/@seedwork/errors/invalid-uuid.error';

const makePlainGenre = (): PlainGenre => {
  const uniqueId = new UniqueEntityId();
  return {
    id: uniqueId.value,
    name: 'Some Name',
    created_at: now(),
    deleted_at: null,
  };
};

describe('Delete genre use case', () => {
  let deleteGenre: DeleteGenre;
  let genreRepository: GenreRepository;

  beforeEach(async () => {
    genreRepository = new GenreRepository({} as PrismaService);
    deleteGenre = new DeleteGenre(genreRepository);
    jest.clearAllMocks();
  });

  it('should delete', async () => {
    jest
      .spyOn(genreRepository, 'find')
      .mockImplementation(async (id) => plainGenre);
    jest
      .spyOn(genreRepository, 'delete')
      .mockImplementation(async () => plainGenre);

    const plainGenre = makePlainGenre();

    expect(await deleteGenre.execute({ id: plainGenre.id })).toMatchObject(
      plainGenre,
    );
  });

  it('should throw NotFoundError', async () => {
    jest.spyOn(genreRepository, 'find').mockImplementation(async () => null);
    jest
      .spyOn(genreRepository, 'delete')
      .mockImplementation(async () => makePlainGenre());

    const uniqueId = new UniqueEntityId();

    expect(() =>
      deleteGenre.execute({ id: uniqueId.value }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should throw InvalidUuidError', async () => {
    jest.spyOn(genreRepository, 'find').mockImplementation(async () => null);
    jest
      .spyOn(genreRepository, 'delete')
      .mockImplementation(async () => makePlainGenre());

    expect(() => deleteGenre.execute({ id: '' })).rejects.toBeInstanceOf(
      InvalidUuidError,
    );
  });
});
