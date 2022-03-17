import { PlainGenre } from '../entities/genre';
import { FindGenre } from './find-genre';
import { GenreRepository } from '../infra/genre.repository';
import { makeRandomPlainGenre } from '../utils';
import InvalidUuidError from '@/@seedwork/errors/invalid-uuid.error';
import NotFoundError from '@/@seedwork/errors/not-found.error';

describe('Find genre use case', () => {
  let findGenre: FindGenre;
  let genreRepository: GenreRepository;
  let plainGenre: PlainGenre;

  beforeEach(async () => {
    genreRepository = new GenreRepository({} as any);
    findGenre = new FindGenre(genreRepository);
    jest.clearAllMocks();
    plainGenre = makeRandomPlainGenre();
  });

  it('should find genre', async () => {
    jest
      .spyOn(genreRepository, 'find')
      .mockImplementation(async () => plainGenre);

    const result = await findGenre.execute(plainGenre.id);
    expect(result).toStrictEqual(plainGenre);
  });

  it('should not find genre', async () => {
    jest.spyOn(genreRepository, 'find').mockImplementation(async () => null);

    expect(() => findGenre.execute(plainGenre.id)).rejects.toThrow(
      NotFoundError,
    );
  });

  it('should throw InvalidUniqueIdError', async () => {
    jest
      .spyOn(genreRepository, 'find')
      .mockImplementation(async () => plainGenre);

    expect(() => findGenre.execute('abc')).rejects.toThrow(InvalidUuidError);
  });
});
