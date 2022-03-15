import {
  registerException,
  resolveException,
} from '@/@seedwork/errors/exception-map';
import { BadRequestException } from '@nestjs/common';
import InvalidRatingError from './invalid-rating.error';

describe('Exception map tests', () => {
  beforeAll(() => {
    registerException('InvalidRatingError', BadRequestException);
  });

  it('should match InvalidRatingError exceptions', () => {
    expect(resolveException(new InvalidRatingError())).toBeInstanceOf(
      BadRequestException,
    );
  });
});
