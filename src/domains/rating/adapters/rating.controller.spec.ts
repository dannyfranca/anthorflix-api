import * as request from 'supertest';
import { Test, TestingModuleBuilder } from '@nestjs/testing';

import { PrismaService } from '@/@seedwork/infra/prisma.service';
import { GlobalModule } from '@/@seedwork/global.module';
import InvalidNameError from '@/@seedwork/errors/invalid-name.error';
import { RatingModule } from '../rating.module';
import { CreateRating } from '../usecases/create-rating';
import { UpdateRating } from '../usecases/update-rating';
import { DeleteRating } from '../usecases/delete-rating';
import { ListRating } from '../usecases/list-rating';
import { PlainRating } from '../entities/rating';
import InvalidUuidError from '@/@seedwork/errors/invalid-uuid.error';
import NotFoundError from '@/@seedwork/errors/not-found.error';
import { makeRandomPlainRating } from '../utils';
import { cloneDeep } from 'lodash';
import InvalidDescriptionError from '@/@seedwork/errors/invalid-description.error';
import InvalidRatingError from '../errors/invalid-rating.error';
import { assertRequest } from '@/@seedwork/utils/supertest';
import {
  makeBadRequestMessage,
  makeNotFoundMessage,
} from '@/@seedwork/utils/messages';

const setupApp = async (fn: (module: TestingModuleBuilder) => any) => {
  const moduleBuilder = Test.createTestingModule({
    imports: [GlobalModule, RatingModule],
  });

  fn(moduleBuilder.overrideProvider(PrismaService).useValue({}));

  const moduleRef = await moduleBuilder.compile();

  const app = moduleRef.createNestApplication();
  await app.init();
  return app;
};

const plainRatingToHttpBody = (plainRating: PlainRating) => {
  const result = cloneDeep<any>(plainRating);
  result.created_at = plainRating.created_at.toISOString();
  result.user.created_at = plainRating.user.created_at.toISOString();
  return result;
};

describe('Ratings Controller', () => {
  let plainRating: PlainRating;

  beforeEach(() => {
    plainRating = makeRandomPlainRating();
  });

  // ON CREATE
  it(`should create ratings`, async () => {
    const app = await setupApp((moduleRef) =>
      moduleRef
        .overrideProvider(CreateRating)
        .useValue({ execute: async () => plainRating }),
    );

    const body = await assertRequest(app)('post')('/ratings')(201);

    expect(body).toMatchObject(plainRatingToHttpBody(plainRating));
  });

  it(`should throw BadRequestException on InvalidNameError`, async () => {
    const invalidError = new InvalidNameError();

    const app = await setupApp((moduleRef) =>
      moduleRef.overrideProvider(CreateRating).useValue({
        execute: async () => {
          throw invalidError;
        },
      }),
    );

    const body = await assertRequest(app)('post')('/ratings')(400);

    expect(body).toStrictEqual(makeBadRequestMessage(invalidError.message));
  });

  it(`should throw BadRequestException on InvalidDescriptionError`, async () => {
    const invalidError = new InvalidDescriptionError();

    const app = await setupApp((moduleRef) =>
      moduleRef.overrideProvider(CreateRating).useValue({
        execute: async () => {
          throw invalidError;
        },
      }),
    );

    const body = await assertRequest(app)('post')('/ratings')(400);

    expect(body).toStrictEqual(makeBadRequestMessage(invalidError.message));
  });

  it(`should throw BadRequestException on InvalidRatingError`, async () => {
    const invalidError = new InvalidRatingError();

    const app = await setupApp((moduleRef) =>
      moduleRef.overrideProvider(CreateRating).useValue({
        execute: async () => {
          throw invalidError;
        },
      }),
    );

    const body = await assertRequest(app)('post')('/ratings')(400);

    expect(body).toStrictEqual(makeBadRequestMessage(invalidError.message));
  });

  // ON DELETE
  it(`should delete ratings`, async () => {
    const app = await setupApp((moduleRef) =>
      moduleRef
        .overrideProvider(DeleteRating)
        .useValue({ execute: async () => plainRating }),
    );

    const body = await assertRequest(app)('delete')(
      '/ratings/' + plainRating.id,
    )(200);

    expect(body).toMatchObject(plainRatingToHttpBody(plainRating));
  });

  it(`should throw BadRequestException on InvalidUuidError`, async () => {
    const invalidError = new InvalidUuidError();

    const app = await setupApp((moduleRef) =>
      moduleRef.overrideProvider(DeleteRating).useValue({
        execute: async () => {
          throw invalidError;
        },
      }),
    );

    const body = await assertRequest(app)('delete')('/ratings/abc')(400);

    expect(body).toStrictEqual(makeBadRequestMessage(invalidError.message));
  });

  it(`should update ratings`, async () => {
    const app = await setupApp((moduleRef) =>
      moduleRef
        .overrideProvider(UpdateRating)
        .useValue({ execute: async () => plainRating }),
    );

    const body = await assertRequest(app)('put')('/ratings/' + plainRating.id)(
      200,
    );

    expect(body).toMatchObject(plainRatingToHttpBody(plainRating));
  });

  it(`should throw NotFoundException`, async () => {
    const invalidError = new NotFoundError();

    const app = await setupApp((moduleRef) =>
      moduleRef.overrideProvider(UpdateRating).useValue({
        execute: async () => {
          throw invalidError;
        },
      }),
    );

    const body = await assertRequest(app)('put')('/ratings/abc')(404);

    expect(body).toStrictEqual(makeNotFoundMessage(invalidError.message));
  });

  // ON LIST
  it(`should list ratings`, async () => {
    const app = await setupApp((moduleRef) =>
      moduleRef
        .overrideProvider(ListRating)
        .useValue({ execute: async () => [plainRating, plainRating] }),
    );

    const body = await assertRequest(app)('get')('/ratings')(200);

    expect(body).toMatchObject([
      plainRatingToHttpBody(plainRating),
      plainRatingToHttpBody(plainRating),
    ]);
  });
});
