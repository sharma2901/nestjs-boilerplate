import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorOptions } from './error-options.interface';

export class UnauthorizedException extends HttpException {
  constructor(private errorOptions?: ErrorOptions) {
    super(errorOptions?.message || 'Not Authorized', HttpStatus.UNAUTHORIZED);
  }
}
