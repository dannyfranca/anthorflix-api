import { PrismaTestController } from '@/@seedwork/infra/prisma-test-controller';
import { now } from '@/@seedwork/utils/date';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { PlainGenre } from '../entities/genre';
import { GenreRepository } from './genre.repository';

describe('GenreRepository', () => {
  const prismaTestController = new PrismaTestController();
  let genreRepository: GenreRepository;

  beforeEach(async () => {
    await prismaTestController.init();
    genreRepository = new GenreRepository(prismaTestController.prisma);
  });

  afterEach(async () => {
    await prismaTestController.destroy();
  });

  it('should create, list and delete', async () => {
    const uniqueId = new UniqueEntityId();
    const plainGenre: PlainGenre = {
      id: uniqueId.value,
      name: 'Some Name',
      created_at: now(),
    };
    const newName = 'Another Name';
    const newPlainGenre = { ...plainGenre, name: newName };

    expect(await genreRepository.find(plainGenre.id)).toBeNull();
    expect(await genreRepository.create(plainGenre)).toMatchObject(plainGenre);
    expect(await genreRepository.find(plainGenre.id)).toMatchObject(plainGenre);
    expect(
      await genreRepository.update({ id: plainGenre.id }, { name: newName }),
    ).toMatchObject(newPlainGenre);
    expect(await genreRepository.find(plainGenre.id)).toMatchObject(
      newPlainGenre,
    );
    expect(await genreRepository.delete(plainGenre.id)).toMatchObject(
      newPlainGenre,
    );
    expect(await genreRepository.find(plainGenre.id)).toBeNull();

    expect(true).toBe(true);
  });
});
