import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestContext } from '../../../utils/request-context';
import { UserDto } from '../../user/dtos/user.dto';
import { AuthAccessTokenDto } from '../dtos/auth-access-token.dto';
import { AuthRefreshTokenDto } from '../dtos/auth-refesh-token.dto';
import { AuthSigninDto } from '../dtos/auth-sign.dto';

@Injectable()
export class AuthSigninAction {
  constructor(private jwtService: JwtService) {}

  async execute(context: RequestContext): Promise<AuthSigninDto> {
    const { correlationId, user } = context;
    if (!user) {
      throw new NotFoundException(
        'User',
        'Username and password are not correct',
      );
    }

    const payloadAccessToken: AuthAccessTokenDto = {
      ...user,
      sessionId: correlationId,
    };

    const accessToken = this.jwtService.sign({
      ...payloadAccessToken,
      token: user.token,
    });

    const payloadRefreshToken: AuthRefreshTokenDto = {
      id: payloadAccessToken.id,
      sessionId: correlationId,
    };
    const refreshToken = this.jwtService.sign(payloadRefreshToken);

    const token: AuthSigninDto = {
      user: payloadAccessToken,
      accessToken,
      refreshToken,
    };

    return token;
  }
}
