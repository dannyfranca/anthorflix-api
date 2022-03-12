import {
  BadRequestException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export const resolveException = (error: Error): HttpException =>
  new (map[error.name] ?? InternalServerErrorException)(error.message);

const map: {
  [k: string]: {
    new (...args: any): HttpException;
  };
} = {
  NotFoundError: NotFoundException,
  InvalidNameError: BadRequestException,
  InvalidUuidError: BadRequestException,
};
