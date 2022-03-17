import { PrismaTestController } from '@/@seedwork/infra/prisma-test-controller';
import { now } from '@/@seedwork/utils/date';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { PlainGenre } from '../entities/genre';
import { GenreRepository } from './genre.repository';
import { omit } from 'lodash';
import { longRunJestTimeout } from '@/@seedwork/config';
import { makeRandomPlainGenre } from '../utils';

describe('GenreRepository', () => {
  const prismaTestController = new PrismaTestController();
  let genreRepository: GenreRepository;

  beforeEach(async () => {
    await prismaTestController.init();
    genreRepository = new GenreRepository(prismaTestController.prisma);
  }, longRunJestTimeout);

  afterEach(async () => {
    await prismaTestController.destroy();
  });

  it('should create and delete', async () => {
    const uniqueId = new UniqueEntityId();
    const plainGenre: PlainGenre = {
      id: uniqueId.value,
      name: 'Some Name',
      created_at: now(),
      deleted_at: null,
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
    const deletedGenre = await genreRepository.delete(plainGenre.id);
    expect(deletedGenre).toMatchObject(omit(newPlainGenre, 'deleted_at'));
    expect(deletedGenre.deleted_at).toBeInstanceOf(Date);
    expect(await genreRepository.find(plainGenre.id)).toBeNull();

    expect(true).toBe(true);
  });

  it('should create and list two genres', async () => {
    const plainGenre = makeRandomPlainGenre();
    const plainGenre2 = makeRandomPlainGenre();

    await genreRepository.create(plainGenre);
    await genreRepository.create(plainGenre2);

    expect(await genreRepository.list()).toMatchObject([
      plainGenre,
      plainGenre2,
    ]);
  });
});
