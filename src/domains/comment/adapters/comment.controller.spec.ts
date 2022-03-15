import { cloneDeep } from 'lodash';

import InvalidNameError from '@/@seedwork/errors/invalid-name.error';
import InvalidUuidError from '@/@seedwork/errors/invalid-uuid.error';
import NotFoundError from '@/@seedwork/errors/not-found.error';
import InvalidDescriptionError from '@/@seedwork/errors/invalid-description.error';
import { assertRequest } from '@/@seedwork/utils/supertest';
import { createTestApp } from '@/@seedwork/utils/nest';
import { CommentModule } from '../comment.module';
import { CreateComment } from '../usecases/create-comment';
import { UpdateComment } from '../usecases/update-comment';
import { DeleteComment } from '../usecases/delete-comment';
import { ListComment } from '../usecases/list-comment';
import { PlainComment } from '../entities/comment';
import { makeRandomPlainComment } from '../utils';
import {
  makeBadRequestMessage,
  makeNotFoundMessage,
} from '@/@seedwork/utils/messages';

const setupApp = createTestApp([CommentModule]);

const plainCommentToHttpBody = (plainComment: PlainComment) => {
  const result = cloneDeep<any>(plainComment);
  result.created_at = plainComment.created_at.toISOString();
  result.user.created_at = plainComment.user.created_at.toISOString();
  return result;
};

describe('Comments Controller', () => {
  let plainComment: PlainComment;

  beforeEach(() => {
    plainComment = makeRandomPlainComment();
  });

  // ON CREATE
  it(`should create comments`, async () => {
    const app = await setupApp((moduleRef) =>
      moduleRef
        .overrideProvider(CreateComment)
        .useValue({ execute: async () => plainComment }),
    );

    const body = await assertRequest(app)('post')('/comments')(201);

    expect(body).toMatchObject(plainCommentToHttpBody(plainComment));
  });

  it(`should throw BadRequestException on InvalidNameError`, async () => {
    const invalidError = new InvalidNameError();

    const app = await setupApp((moduleRef) =>
      moduleRef.overrideProvider(CreateComment).useValue({
        execute: async () => {
          throw invalidError;
        },
      }),
    );

    const body = await assertRequest(app)('post')('/comments')(400);

    expect(body).toStrictEqual(makeBadRequestMessage(invalidError.message));
  });

  it(`should throw BadRequestException on InvalidDescriptionError`, async () => {
    const invalidError = new InvalidDescriptionError();

    const app = await setupApp((moduleRef) =>
      moduleRef.overrideProvider(CreateComment).useValue({
        execute: async () => {
          throw invalidError;
        },
      }),
    );

    const body = await assertRequest(app)('post')('/comments')(400);

    expect(body).toStrictEqual(makeBadRequestMessage(invalidError.message));
  });

  // ON DELETE
  it(`should delete comments`, async () => {
    const app = await setupApp((moduleRef) =>
      moduleRef
        .overrideProvider(DeleteComment)
        .useValue({ execute: async () => plainComment }),
    );

    const body = await assertRequest(app)('delete')(
      '/comments/' + plainComment.id,
    )(200);

    expect(body).toMatchObject(plainCommentToHttpBody(plainComment));
  });

  it(`should throw BadRequestException on InvalidUuidError`, async () => {
    const invalidError = new InvalidUuidError();

    const app = await setupApp((moduleRef) =>
      moduleRef.overrideProvider(DeleteComment).useValue({
        execute: async () => {
          throw invalidError;
        },
      }),
    );

    const body = await assertRequest(app)('delete')('/comments/abc')(400);

    expect(body).toStrictEqual(makeBadRequestMessage(invalidError.message));
  });

  it(`should update comments`, async () => {
    const app = await setupApp((moduleRef) =>
      moduleRef
        .overrideProvider(UpdateComment)
        .useValue({ execute: async () => plainComment }),
    );

    const body = await assertRequest(app)('put')(
      '/comments/' + plainComment.id,
    )(200);

    expect(body).toMatchObject(plainCommentToHttpBody(plainComment));
  });

  it(`should throw NotFoundException`, async () => {
    const invalidError = new NotFoundError();

    const app = await setupApp((moduleRef) =>
      moduleRef.overrideProvider(UpdateComment).useValue({
        execute: async () => {
          throw invalidError;
        },
      }),
    );

    const body = await assertRequest(app)('put')('/comments/abc')(404);

    expect(body).toStrictEqual(makeNotFoundMessage(invalidError.message));
  });

  // ON LIST
  it(`should list comments`, async () => {
    const app = await setupApp((moduleRef) =>
      moduleRef
        .overrideProvider(ListComment)
        .useValue({ execute: async () => [plainComment, plainComment] }),
    );

    const body = await assertRequest(app)('get')('/comments')(200);

    expect(body).toMatchObject([
      plainCommentToHttpBody(plainComment),
      plainCommentToHttpBody(plainComment),
    ]);
  });
});
