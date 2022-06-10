import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from 'jsonwebtoken';
import { AuthAccessTokenDto } from '../dtos/auth-access-token.dto';

@Injectable()
export class AuthJwtGuard extends AuthGuard('jwt') {
  handleRequest<TUser extends AuthAccessTokenDto>(
    error: Error,
    user: TUser,
    info: TokenExpiredError,
    context: ExecutionContext,
  ) {
    if (error || !user) {
      throw error || new UnauthorizedException('Unauthorized');
    }
    return user;
  }
}
