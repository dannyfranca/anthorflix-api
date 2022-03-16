import * as request from 'supertest';
import { Test, TestingModuleBuilder } from '@nestjs/testing';

import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { now } from '@/@seedwork/utils/date';
import { PrismaService } from '@/@seedwork/infra/prisma.service';
import { GlobalModule } from '@/@seedwork/global.module';
import InvalidNameError from '@/@seedwork/errors/invalid-name.error';
import { CastMemberModule } from '../cast-member.module';
import { CreateCastMember } from '../usecases/create-cast-member';
import { UpdateCastMember } from '../usecases/update-cast-member';
import { DeleteCastMember } from '../usecases/delete-cast-member';
import { ListCastMember } from '../usecases/list-cast-member';
import { PlainCastMember } from '../entities/cast-member';
import InvalidUuidError from '@/@seedwork/errors/invalid-uuid.error';
import NotFoundError from '@/@seedwork/errors/not-found.error';
import { FindCastMember } from '../usecases/find-cast-member';
import { assertRequest } from '@/@seedwork/utils/supertest';
import { makeNotFoundMessage } from '@/@seedwork/utils/messages';
import { makeRandomPlainCastMember } from '../utils';

const setupApp = async (fn: (module: TestingModuleBuilder) => any) => {
  const moduleBuilder = Test.createTestingModule({
    imports: [GlobalModule, CastMemberModule],
  });

  fn(moduleBuilder.overrideProvider(PrismaService).useValue({}));

  const moduleRef = await moduleBuilder.compile();

  const app = moduleRef.createNestApplication();
  await app.init();
  return app;
};

const plainCastMemberToHttpBody = (plainCastMember: PlainCastMember) => {
  const { id, name, created_at } = plainCastMember;
  return { id, name, created_at: created_at.toISOString() };
};

describe('Cast members Controller', () => {
  it(`should find genre`, async () => {
    const plainCastMember = makeRandomPlainCastMember();

    const app = await setupApp((moduleRef) =>
      moduleRef
        .overrideProvider(FindCastMember)
        .useValue({ execute: async () => plainCastMember }),
    );

    const body = await assertRequest(app)('get')(
      '/cast_members/' + plainCastMember.id,
    )(200);

    expect(body).toMatchObject(plainCastMemberToHttpBody(plainCastMember));
  });

  it(`should throw when not find genre`, async () => {
    const plainCastMember = makeRandomPlainCastMember();
    const notFoundError = new NotFoundError();

    const app = await setupApp((moduleRef) =>
      moduleRef.overrideProvider(FindCastMember).useValue({
        execute: async () => {
          throw notFoundError;
        },
      }),
    );

    const body = await assertRequest(app)('get')(
      '/cast_members/' + plainCastMember.id,
    )(404);

    expect(body).toMatchObject(makeNotFoundMessage(notFoundError.message));
  });

  it(`should create cast members`, async () => {
    const plainCastMember = makeRandomPlainCastMember();

    const app = await setupApp((moduleRef) =>
      moduleRef
        .overrideProvider(CreateCastMember)
        .useValue({ execute: async () => plainCastMember }),
    );

    const body = await request(app.getHttpServer())
      .post('/cast_members')
      .expect(201)
      .then(({ body }) => body);

    expect(body).toMatchObject(plainCastMemberToHttpBody(plainCastMember));
  });

  it(`should throw BadRequestException`, async () => {
    const invalidError = new InvalidNameError();

    const app = await setupApp((moduleRef) =>
      moduleRef.overrideProvider(CreateCastMember).useValue({
        execute: async () => {
          throw invalidError;
        },
      }),
    );

    const body = await request(app.getHttpServer())
      .post('/cast_members')
      .expect(400)
      .then(({ body }) => body);
    Error;
    expect(body).toStrictEqual({
      message: invalidError.message,
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it(`should delete castMembers`, async () => {
    const plainCastMember = makeRandomPlainCastMember();

    const app = await setupApp((moduleRef) =>
      moduleRef
        .overrideProvider(DeleteCastMember)
        .useValue({ execute: async () => plainCastMember }),
    );

    const body = await request(app.getHttpServer())
      .delete('/cast_members/' + plainCastMember.id)
      .expect(200)
      .then(({ body }) => body);

    expect(body).toMatchObject(plainCastMemberToHttpBody(plainCastMember));
  });

  it(`should throw BadRequestException`, async () => {
    const invalidError = new InvalidUuidError();

    const app = await setupApp((moduleRef) =>
      moduleRef.overrideProvider(DeleteCastMember).useValue({
        execute: async () => {
          throw invalidError;
        },
      }),
    );

    const body = await request(app.getHttpServer())
      .delete('/cast_members/abc')
      .expect(400)
      .then(({ body }) => body);
    Error;
    expect(body).toStrictEqual({
      message: invalidError.message,
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it(`should update castMembers`, async () => {
    const plainCastMember = makeRandomPlainCastMember();

    const app = await setupApp((moduleRef) =>
      moduleRef
        .overrideProvider(UpdateCastMember)
        .useValue({ execute: async () => plainCastMember }),
    );

    const body = await request(app.getHttpServer())
      .put('/cast_members/' + plainCastMember.id)
      .expect(200)
      .then(({ body }) => body);

    expect(body).toMatchObject(plainCastMemberToHttpBody(plainCastMember));
  });

  it(`should throw NotFoundException`, async () => {
    const invalidError = new NotFoundError();

    const app = await setupApp((moduleRef) =>
      moduleRef.overrideProvider(UpdateCastMember).useValue({
        execute: async () => {
          throw invalidError;
        },
      }),
    );

    const body = await request(app.getHttpServer())
      .put('/cast_members/abc')
      .expect(404)
      .then(({ body }) => body);
    Error;
    expect(body).toStrictEqual({
      message: invalidError.message,
      error: 'Not Found',
      statusCode: 404,
    });
  });

  it(`should list castMembers`, async () => {
    const plainCastMember = makeRandomPlainCastMember();

    const app = await setupApp((moduleRef) =>
      moduleRef
        .overrideProvider(ListCastMember)
        .useValue({ execute: async () => [plainCastMember, plainCastMember] }),
    );

    const body = await request(app.getHttpServer())
      .get('/cast_members')
      .expect(200)
      .then(({ body }) => body);

    expect(body).toMatchObject([
      plainCastMemberToHttpBody(plainCastMember),
      plainCastMemberToHttpBody(plainCastMember),
    ]);
  });
});
