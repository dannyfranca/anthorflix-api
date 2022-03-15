import {
  BadRequestException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export const resolveException = (error: Error): HttpException =>
  new (exceptionMap[error?.name] ?? InternalServerErrorException)(
    error?.message,
  );

export const registerException = (
  key: string,
  exception: {
    new (...args: any): HttpException;
  },
) => {
  exceptionMap[key] = exception;
};

const exceptionMap: {
  [k: string]: {
    new (...args: any): HttpException;
  };
} = {
  NotFoundError: NotFoundException,
  InvalidNameError: BadRequestException,
  InvalidUsernameError: BadRequestException,
  InvalidDescriptionError: BadRequestException,
  InvalidUuidError: BadRequestException,
};
