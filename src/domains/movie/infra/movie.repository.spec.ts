import { omit } from 'lodash';

import { PrismaTestController } from '@/@seedwork/infra/prisma-test-controller';
import { PlainMovie } from '../entities/movie';
import { MovieRepository } from './movie.repository';
import { makeRandomPlainMovie } from '../utils';

describe('MovieRepository', () => {
  const prismaTestController = new PrismaTestController();
  let movieRepository: MovieRepository;

  beforeEach(async () => {
    await prismaTestController.init();
    movieRepository = new MovieRepository(prismaTestController.prisma);
  });

  afterEach(async () => {
    await prismaTestController.destroy();
  });

  it('should create, update and delete', async () => {
    let newPlainMovie: PlainMovie;
    let newTitle: string;
    let newDesc: string;
    let newYear: number;
    const plainMovie: PlainMovie = makeRandomPlainMovie();
    newPlainMovie = { ...plainMovie };

    expect(await movieRepository.find(plainMovie.id)).toBeNull();
    expect(await movieRepository.create(plainMovie)).toMatchObject(plainMovie);
    expect(await movieRepository.find(plainMovie.id)).toMatchObject(plainMovie);

    newTitle = 'Another Name';
    newPlainMovie = { ...newPlainMovie, title: newTitle };
    expect(
      await movieRepository.update({ id: plainMovie.id }, { title: newTitle }),
    ).toMatchObject(newPlainMovie);
    expect(await movieRepository.find(plainMovie.id)).toMatchObject(
      newPlainMovie,
    );

    newDesc = 'Another Desc';
    newPlainMovie = { ...newPlainMovie, description: newDesc };
    expect(
      await movieRepository.update(
        { id: plainMovie.id },
        { description: newDesc },
      ),
    ).toMatchObject(newPlainMovie);
    expect(await movieRepository.find(plainMovie.id)).toMatchObject(
      newPlainMovie,
    );

    newYear = 2014;
    newPlainMovie = { ...newPlainMovie, year_launched: newYear };
    expect(
      await movieRepository.update(
        { id: plainMovie.id },
        { year_launched: newYear },
      ),
    ).toMatchObject(newPlainMovie);
    expect(await movieRepository.find(plainMovie.id)).toMatchObject(
      newPlainMovie,
    );

    const deletedMovie = await movieRepository.delete(plainMovie.id);
    expect(deletedMovie).toMatchObject(omit(newPlainMovie, 'deleted_at'));
    expect(deletedMovie.deleted_at).toBeInstanceOf(Date);
    expect(await movieRepository.find(plainMovie.id)).toBeNull();
  });

  it('should create and list two movies', async () => {
    const plainMovie1 = makeRandomPlainMovie();
    const plainMovie2 = makeRandomPlainMovie();

    await movieRepository.create(plainMovie1);
    await movieRepository.create(plainMovie2);

    expect(await movieRepository.list()).toStrictEqual([
      plainMovie1,
      plainMovie2,
    ]);
  });
});
