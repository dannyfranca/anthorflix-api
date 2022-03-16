import * as request from 'supertest';
import { Test, TestingModuleBuilder } from '@nestjs/testing';

import { PrismaService } from '@/@seedwork/infra/prisma.service';
import { GlobalModule } from '@/@seedwork/global.module';
import InvalidNameError from '@/@seedwork/errors/invalid-name.error';
import { MovieModule } from '../movie.module';
import { CreateMovie } from '../usecases/create-movie';
import { UpdateMovie } from '../usecases/update-movie';
import { DeleteMovie } from '../usecases/delete-movie';
import { ListMovie } from '../usecases/list-movie';
import { PlainMovie } from '../entities/movie';
import InvalidUuidError from '@/@seedwork/errors/invalid-uuid.error';
import NotFoundError from '@/@seedwork/errors/not-found.error';
import { makeRandomPlainMovie } from '../utils';
import { assertRequest } from '@/@seedwork/utils/supertest';
import { makeNotFoundMessage } from '@/@seedwork/utils/messages';
import { FindMovie } from '../usecases/find-movie';

const setupApp = async (fn: (module: TestingModuleBuilder) => any) => {
  const moduleBuilder = Test.createTestingModule({
    imports: [GlobalModule, MovieModule],
  });

  fn(moduleBuilder.overrideProvider(PrismaService).useValue({}));

  const moduleRef = await moduleBuilder.compile();

  const app = moduleRef.createNestApplication();
  await app.init();
  return app;
};

const plainMovieToHttpBody = (plainMovie: PlainMovie) => {
  const { created_at, ...args } = plainMovie;
  return { created_at: created_at.toISOString(), ...args };
};

describe('Movies Controller', () => {
  it(`should find movie`, async () => {
    const plainMovie = makeRandomPlainMovie();

    const app = await setupApp((moduleRef) =>
      moduleRef
        .overrideProvider(FindMovie)
        .useValue({ execute: async () => plainMovie }),
    );

    const body = await assertRequest(app)('get')('/movies/' + plainMovie.id)(
      200,
    );

    expect(body).toMatchObject(plainMovieToHttpBody(plainMovie));
  });

  it(`should throw when not find movie`, async () => {
    const plainMovie = makeRandomPlainMovie();
    const notFoundError = new NotFoundError();

    const app = await setupApp((moduleRef) =>
      moduleRef.overrideProvider(FindMovie).useValue({
        execute: async () => {
          throw notFoundError;
        },
      }),
    );

    const body = await assertRequest(app)('get')('/movies/' + plainMovie.id)(
      404,
    );

    expect(body).toMatchObject(makeNotFoundMessage(notFoundError.message));
  });

  it(`should create movies`, async () => {
    const plainMovie = makeRandomPlainMovie();

    const app = await setupApp((moduleRef) =>
      moduleRef
        .overrideProvider(CreateMovie)
        .useValue({ execute: async () => plainMovie }),
    );

    const body = await request(app.getHttpServer())
      .post('/movies')
      .expect(201)
      .then(({ body }) => body);

    expect(body).toMatchObject(plainMovieToHttpBody(plainMovie));
  });

  it(`should throw BadRequestException`, async () => {
    const invalidError = new InvalidNameError();

    const app = await setupApp((moduleRef) =>
      moduleRef.overrideProvider(CreateMovie).useValue({
        execute: async () => {
          throw invalidError;
        },
      }),
    );

    const body = await request(app.getHttpServer())
      .post('/movies')
      .expect(400)
      .then(({ body }) => body);
    Error;
    expect(body).toStrictEqual({
      message: invalidError.message,
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it(`should delete movies`, async () => {
    const plainMovie = makeRandomPlainMovie();

    const app = await setupApp((moduleRef) =>
      moduleRef
        .overrideProvider(DeleteMovie)
        .useValue({ execute: async () => plainMovie }),
    );

    const body = await request(app.getHttpServer())
      .delete('/movies/' + plainMovie.id)
      .expect(200)
      .then(({ body }) => body);

    expect(body).toMatchObject(plainMovieToHttpBody(plainMovie));
  });

  it(`should throw BadRequestException`, async () => {
    const invalidError = new InvalidUuidError();

    const app = await setupApp((moduleRef) =>
      moduleRef.overrideProvider(DeleteMovie).useValue({
        execute: async () => {
          throw invalidError;
        },
      }),
    );

    const body = await request(app.getHttpServer())
      .delete('/movies/abc')
      .expect(400)
      .then(({ body }) => body);
    Error;
    expect(body).toStrictEqual({
      message: invalidError.message,
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it(`should update movies`, async () => {
    const plainMovie = makeRandomPlainMovie();

    const app = await setupApp((moduleRef) =>
      moduleRef
        .overrideProvider(UpdateMovie)
        .useValue({ execute: async () => plainMovie }),
    );

    const body = await request(app.getHttpServer())
      .put('/movies/' + plainMovie.id)
      .expect(200)
      .then(({ body }) => body);

    expect(body).toMatchObject(plainMovieToHttpBody(plainMovie));
  });

  it(`should throw NotFoundException`, async () => {
    const invalidError = new NotFoundError();

    const app = await setupApp((moduleRef) =>
      moduleRef.overrideProvider(UpdateMovie).useValue({
        execute: async () => {
          throw invalidError;
        },
      }),
    );

    const body = await request(app.getHttpServer())
      .put('/movies/abc')
      .expect(404)
      .then(({ body }) => body);
    Error;
    expect(body).toStrictEqual({
      message: invalidError.message,
      error: 'Not Found',
      statusCode: 404,
    });
  });

  it(`should list movies`, async () => {
    const plainMovie = makeRandomPlainMovie();

    const app = await setupApp((moduleRef) =>
      moduleRef
        .overrideProvider(ListMovie)
        .useValue({ execute: async () => [plainMovie, plainMovie] }),
    );

    const body = await request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .then(({ body }) => body);

    expect(body).toMatchObject([
      plainMovieToHttpBody(plainMovie),
      plainMovieToHttpBody(plainMovie),
    ]);
  });
});
