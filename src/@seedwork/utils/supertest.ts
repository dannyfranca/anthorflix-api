import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export const assertRequest =
  (app: INestApplication) =>
  (method: 'post' | 'get' | 'delete' | 'put') =>
  (path: string) =>
  (statusCode: number) =>
    request(app.getHttpServer())
      [method](path)
      .expect(statusCode)
      .then(({ body }) => body);
