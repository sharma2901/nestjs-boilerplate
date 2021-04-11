import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorOptions } from './error-options.interface';

export class ForbiddenException extends HttpException {
  constructor(private errorOptions?: ErrorOptions) {
    super(errorOptions?.message || 'Forbidden', HttpStatus.FORBIDDEN);
  }
}
