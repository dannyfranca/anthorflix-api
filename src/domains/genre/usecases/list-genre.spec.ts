import { now } from '@/@seedwork/utils/date';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { PlainGenre } from '../entities/genre';
import { ListGenre } from './list-genre';
import { GenreRepository } from '../infra/genre.repository';
import { PrismaService } from '@/@seedwork/infra/prisma.service';

describe('List genre use case', () => {
  let listGenre: ListGenre;
  let genreRepository: GenreRepository;

  beforeEach(async () => {
    genreRepository = new GenreRepository({} as PrismaService);
    listGenre = new ListGenre(genreRepository);
    jest.clearAllMocks();
  });

  it('should list two', async () => {
    jest
      .spyOn(genreRepository, 'list')
      .mockImplementation(async () => [plainGenre, plainGenre]);

    const uniqueId = new UniqueEntityId();
    const plainGenre: PlainGenre = {
      id: uniqueId.value,
      name: 'Some Name',
      created_at: now(),
    };

    const result = await listGenre.execute();
    expect(result.length).toBe(2);
    expect(result).toMatchObject([plainGenre, plainGenre]);
  });

  it('should list empty array', async () => {
    jest.spyOn(genreRepository, 'list').mockImplementation(async () => []);

    expect(await listGenre.execute()).toStrictEqual([]);
  });
});
