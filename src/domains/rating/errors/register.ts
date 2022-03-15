import { registerException } from '@/@seedwork/errors/exception-map';
import { BadRequestException } from '@nestjs/common';

export const registerErrorMappings = () => {
  registerException('InvalidRatingError', BadRequestException);
};
