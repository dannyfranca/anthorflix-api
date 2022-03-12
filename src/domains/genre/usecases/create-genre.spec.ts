import { now } from '@/@seedwork/utils/date';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { PlainGenre } from '../entities/genre';
import { CreateGenre } from './create-genre';
import { GenreRepository } from '../infra/genre.repository';
import { PrismaService } from '@/@seedwork/infra/prisma.service';
import InvalidNameError from '@/@seedwork/errors/invalid-name.error';

const makePlainGenre = (): PlainGenre => {
  const uniqueId = new UniqueEntityId();
  return {
    id: uniqueId.value,
    name: 'Some Name',
    created_at: now(),
  };
};

describe('Create genre use case', () => {
  let createGenre: CreateGenre;
  let genreRepository: GenreRepository;

  beforeEach(async () => {
    genreRepository = new GenreRepository({} as PrismaService);
    createGenre = new CreateGenre(genreRepository);
    jest.clearAllMocks();
  });

  it('should create', async () => {
    jest
      .spyOn(genreRepository, 'create')
      .mockImplementation(async () => plainGenre);

    const plainGenre = makePlainGenre();

    expect(await createGenre.execute(plainGenre)).toMatchObject(plainGenre);
  });

  it('should throw InvalidNameError', () => {
    jest
      .spyOn(genreRepository, 'create')
      .mockImplementation(async () => makePlainGenre());

    expect(() => createGenre.execute({ name: 'a' })).rejects.toBeInstanceOf(
      InvalidNameError,
    );
  });
});
