import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '../utils/exceptions';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleRequest(err: any, user: any, info: any) {
    if (err) {
      console.error('Error while runing JWT auth Guard:', err);
    }
    if (info) {
      console.info('Info on JWT auth guard', info);
    }

    if (!user) {
      throw new UnauthorizedException({
        message: 'You are not authorised to access this endpoint.',
      });
    }
    return user;
  }
}
