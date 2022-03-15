import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { resolveException } from './exception-map';
import InvalidDescriptionError from './invalid-description.error';
import InvalidNameError from './invalid-name.error';
import InvalidUuidError from './invalid-uuid.error';
import NotFoundError from './not-found.error';

describe('Exception map tests', () => {
  test('match exceptions', () => {
    expect(resolveException(new NotFoundError())).toBeInstanceOf(
      NotFoundException,
    );
    expect(resolveException(new InvalidNameError())).toBeInstanceOf(
      BadRequestException,
    );
    expect(resolveException(new InvalidDescriptionError())).toBeInstanceOf(
      BadRequestException,
    );
    expect(resolveException(new InvalidUuidError())).toBeInstanceOf(
      BadRequestException,
    );
    expect(resolveException(new Error())).toBeInstanceOf(
      InternalServerErrorException,
    );
  });

  it('should match exceptions message', () => {
    const notFoundError = new NotFoundError('Resource not found');
    const resolvedNotFoundException = resolveException(notFoundError);
    const error = new Error('Some message');
    const resolvedException = resolveException(error);

    expect(resolvedNotFoundException.message).toBe('Resource not found');
    expect(resolvedException.message).toBe('Some message');
  });
});
