import * as request from 'supertest';
import { Test, TestingModuleBuilder } from '@nestjs/testing';

import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { now } from '@/@seedwork/utils/date';
import { PrismaService } from '@/@seedwork/infra/prisma.service';
import { GlobalModule } from '@/@seedwork/global.module';
import InvalidNameError from '@/@seedwork/errors/invalid-name.error';
import { GenreModule } from '../genre.module';
import { CreateGenre } from '../usecases/create-genre';
import { UpdateGenre } from '../usecases/update-genre';
import { DeleteGenre } from '../usecases/delete-genre';
import { ListGenre } from '../usecases/list-genre';
import { PlainGenre } from '../entities/genre';
import InvalidUuidError from '@/@seedwork/errors/invalid-uuid.error';
import NotFoundError from '@/@seedwork/errors/not-found.error';

const setupApp = async (fn: (module: TestingModuleBuilder) => any) => {
  const moduleBuilder = Test.createTestingModule({
    imports: [GlobalModule, GenreModule],
  });

  fn(moduleBuilder.overrideProvider(PrismaService).useValue({}));

  const moduleRef = await moduleBuilder.compile();

  const app = moduleRef.createNestApplication();
  await app.init();
  return app;
};

const makePlainGenre = (): PlainGenre => {
  const uniqueId = new UniqueEntityId();
  return {
    id: uniqueId.value,
    name: 'Some Name',
    created_at: now(),
    deleted_at: null,
  };
};

const plainGenreToHttpBody = (plainGenre: PlainGenre) => {
  const { id, name, created_at } = plainGenre;
  return { id, name, created_at: created_at.toISOString() };
};

describe('Genres Controller', () => {
  it(`should create genres`, async () => {
    const plainGenre = makePlainGenre();

    const app = await setupApp((moduleRef) =>
      moduleRef
        .overrideProvider(CreateGenre)
        .useValue({ execute: async () => plainGenre }),
    );

    const body = await request(app.getHttpServer())
      .post('/genres')
      .expect(201)
      .then(({ body }) => body);

    expect(body).toMatchObject(plainGenreToHttpBody(plainGenre));
  });

  it(`should throw BadRequestException`, async () => {
    const invalidError = new InvalidNameError();

    const app = await setupApp((moduleRef) =>
      moduleRef.overrideProvider(CreateGenre).useValue({
        execute: async () => {
          throw invalidError;
        },
      }),
    );

    const body = await request(app.getHttpServer())
      .post('/genres')
      .expect(400)
      .then(({ body }) => body);
    Error;
    expect(body).toStrictEqual({
      message: invalidError.message,
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it(`should delete genres`, async () => {
    const plainGenre = makePlainGenre();

    const app = await setupApp((moduleRef) =>
      moduleRef
        .overrideProvider(DeleteGenre)
        .useValue({ execute: async () => plainGenre }),
    );

    const body = await request(app.getHttpServer())
      .delete('/genres/' + plainGenre.id)
      .expect(200)
      .then(({ body }) => body);

    expect(body).toMatchObject(plainGenreToHttpBody(plainGenre));
  });

  it(`should throw BadRequestException`, async () => {
    const invalidError = new InvalidUuidError();

    const app = await setupApp((moduleRef) =>
      moduleRef.overrideProvider(DeleteGenre).useValue({
        execute: async () => {
          throw invalidError;
        },
      }),
    );

    const body = await request(app.getHttpServer())
      .delete('/genres/abc')
      .expect(400)
      .then(({ body }) => body);
    Error;
    expect(body).toStrictEqual({
      message: invalidError.message,
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it(`should update genres`, async () => {
    const plainGenre = makePlainGenre();

    const app = await setupApp((moduleRef) =>
      moduleRef
        .overrideProvider(UpdateGenre)
        .useValue({ execute: async () => plainGenre }),
    );

    const body = await request(app.getHttpServer())
      .put('/genres/' + plainGenre.id)
      .expect(200)
      .then(({ body }) => body);

    expect(body).toMatchObject(plainGenreToHttpBody(plainGenre));
  });

  it(`should throw NotFoundException`, async () => {
    const invalidError = new NotFoundError();

    const app = await setupApp((moduleRef) =>
      moduleRef.overrideProvider(UpdateGenre).useValue({
        execute: async () => {
          throw invalidError;
        },
      }),
    );

    const body = await request(app.getHttpServer())
      .put('/genres/abc')
      .expect(404)
      .then(({ body }) => body);
    Error;
    expect(body).toStrictEqual({
      message: invalidError.message,
      error: 'Not Found',
      statusCode: 404,
    });
  });

  it(`should list genres`, async () => {
    const plainGenre = makePlainGenre();

    const app = await setupApp((moduleRef) =>
      moduleRef
        .overrideProvider(ListGenre)
        .useValue({ execute: async () => [plainGenre, plainGenre] }),
    );

    const body = await request(app.getHttpServer())
      .get('/genres')
      .expect(200)
      .then(({ body }) => body);

    expect(body).toMatchObject([
      plainGenreToHttpBody(plainGenre),
      plainGenreToHttpBody(plainGenre),
    ]);
  });
});
