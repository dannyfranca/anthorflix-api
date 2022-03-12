import { now } from '@/@seedwork/utils/date';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { PlainGenre } from '../entities/genre';
import { UpdateGenre } from './update-genre';
import { GenreRepository } from '../infra/genre.repository';
import { PrismaService } from '@/@seedwork/infra/prisma.service';
import NotFoundError from '@/@seedwork/errors/not-found.error';
import InvalidUuidError from '@/@seedwork/errors/invalid-uuid.error';
import InvalidNameError from '@/@seedwork/errors/invalid-name.error';

const makePlainGenre = (): PlainGenre => {
  const uniqueId = new UniqueEntityId();
  return {
    id: uniqueId.value,
    name: 'Some Name',
    created_at: now(),
  };
};
const newName = 'Another Name';

describe('Update genre use case', () => {
  let updateGenre: UpdateGenre;
  let genreRepository: GenreRepository;

  beforeEach(async () => {
    genreRepository = new GenreRepository({} as PrismaService);
    updateGenre = new UpdateGenre(genreRepository);
    jest.clearAllMocks();
  });

  it('should update', async () => {
    jest
      .spyOn(genreRepository, 'find')
      .mockImplementation(async (id) => plainGenre);
    jest
      .spyOn(genreRepository, 'update')
      .mockImplementation(async () => plainGenre);

    const plainGenre = makePlainGenre();

    expect(
      await updateGenre.execute({ id: plainGenre.id }, { name: newName }),
    ).toMatchObject(plainGenre);
  });

  it('should throw NotFoundError', async () => {
    jest.spyOn(genreRepository, 'find').mockImplementation(async () => null);
    jest
      .spyOn(genreRepository, 'update')
      .mockImplementation(async () => makePlainGenre());

    const uniqueId = new UniqueEntityId();

    expect(() =>
      updateGenre.execute({ id: uniqueId.value }, { name: newName }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should throw InvalidUuidError', async () => {
    jest
      .spyOn(genreRepository, 'find')
      .mockImplementation(async () => makePlainGenre());
    jest
      .spyOn(genreRepository, 'update')
      .mockImplementation(async () => makePlainGenre());

    expect(() =>
      updateGenre.execute({ id: 'abc' }, { name: newName }),
    ).rejects.toBeInstanceOf(InvalidUuidError);
  });

  it('should throw InvalidNameError', async () => {
    jest
      .spyOn(genreRepository, 'find')
      .mockImplementation(async () => makePlainGenre());
    jest
      .spyOn(genreRepository, 'update')
      .mockImplementation(async () => makePlainGenre());

    const uniqueId = new UniqueEntityId();

    expect(() =>
      updateGenre.execute({ id: uniqueId.value }, { name: 'a' }),
    ).rejects.toBeInstanceOf(InvalidNameError);
  });
});
