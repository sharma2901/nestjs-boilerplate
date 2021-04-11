import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorOptions } from './error-options.interface';

export class NotFoundException extends HttpException {
  constructor(private errorOptions?: ErrorOptions) {
    super(errorOptions?.message || 'Not Found', HttpStatus.NOT_FOUND);
  }
}
