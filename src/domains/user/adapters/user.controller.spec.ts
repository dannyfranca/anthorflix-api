import { cloneDeep } from 'lodash';

import InvalidNameError from '@/@seedwork/errors/invalid-name.error';
import InvalidUuidError from '@/@seedwork/errors/invalid-uuid.error';
import NotFoundError from '@/@seedwork/errors/not-found.error';
import InvalidDescriptionError from '@/@seedwork/errors/invalid-description.error';
import { assertRequest } from '@/@seedwork/utils/supertest';
import { createTestApp } from '@/@seedwork/utils/nest';
import { UserModule } from '../user.module';
import { CreateUser } from '../usecases/create-user';
import { DeleteUser } from '../usecases/delete-user';
import { ListUser } from '../usecases/list-user';
import { PlainUser } from '../entities/user';
import { makeRandomPlainUser } from '../utils';
import {
  makeBadRequestMessage,
  makeNotFoundMessage,
} from '@/@seedwork/utils/messages';

const setupApp = createTestApp([UserModule]);

const plainUserToHttpBody = (plainUser: PlainUser) => {
  const result = cloneDeep<any>(plainUser);
  result.created_at = plainUser.created_at.toISOString();
  return result;
};

describe('Users Controller', () => {
  let plainUser: PlainUser;

  beforeEach(() => {
    plainUser = makeRandomPlainUser();
  });

  // ON CREATE
  it(`should create users`, async () => {
    const app = await setupApp((moduleRef) =>
      moduleRef
        .overrideProvider(CreateUser)
        .useValue({ execute: async () => plainUser }),
    );

    const body = await assertRequest(app)('post')('/users')(201);

    expect(body).toMatchObject(plainUserToHttpBody(plainUser));
  });

  it(`should throw BadRequestException on InvalidNameError`, async () => {
    const invalidError = new InvalidNameError();

    const app = await setupApp((moduleRef) =>
      moduleRef.overrideProvider(CreateUser).useValue({
        execute: async () => {
          throw invalidError;
        },
      }),
    );

    const body = await assertRequest(app)('post')('/users')(400);

    expect(body).toStrictEqual(makeBadRequestMessage(invalidError.message));
  });

  it(`should throw BadRequestException on InvalidDescriptionError`, async () => {
    const invalidError = new InvalidDescriptionError();

    const app = await setupApp((moduleRef) =>
      moduleRef.overrideProvider(CreateUser).useValue({
        execute: async () => {
          throw invalidError;
        },
      }),
    );

    const body = await assertRequest(app)('post')('/users')(400);

    expect(body).toStrictEqual(makeBadRequestMessage(invalidError.message));
  });

  // ON DELETE
  it(`should delete users`, async () => {
    const app = await setupApp((moduleRef) =>
      moduleRef
        .overrideProvider(DeleteUser)
        .useValue({ execute: async () => plainUser }),
    );

    const body = await assertRequest(app)('delete')('/users/' + plainUser.id)(
      200,
    );

    expect(body).toMatchObject(plainUserToHttpBody(plainUser));
  });

  it(`should throw BadRequestException on InvalidUuidError`, async () => {
    const invalidError = new InvalidUuidError();

    const app = await setupApp((moduleRef) =>
      moduleRef.overrideProvider(DeleteUser).useValue({
        execute: async () => {
          throw invalidError;
        },
      }),
    );

    const body = await assertRequest(app)('delete')('/users/abc')(400);

    expect(body).toStrictEqual(makeBadRequestMessage(invalidError.message));
  });

  it(`should throw NotFoundException`, async () => {
    const invalidError = new NotFoundError();

    const app = await setupApp((moduleRef) =>
      moduleRef.overrideProvider(DeleteUser).useValue({
        execute: async () => {
          throw invalidError;
        },
      }),
    );

    const body = await assertRequest(app)('delete')('/users/abc')(404);

    expect(body).toStrictEqual(makeNotFoundMessage(invalidError.message));
  });

  // ON LIST
  it(`should list users`, async () => {
    const app = await setupApp((moduleRef) =>
      moduleRef
        .overrideProvider(ListUser)
        .useValue({ execute: async () => [plainUser, plainUser] }),
    );

    const body = await assertRequest(app)('get')('/users')(200);

    expect(body).toMatchObject([
      plainUserToHttpBody(plainUser),
      plainUserToHttpBody(plainUser),
    ]);
  });
});
