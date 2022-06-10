import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  ServiceUnavailableException,
  UseGuards,
} from '@nestjs/common';
import { AppRequest } from '../../utils/app-request';
import { AuthJwtGuard } from './guards/auth-jwt.guard';
import { AuthSigninGuard } from './guards/auth-signin.guard';
import { AuthSignInAction } from './services/auth-signin-action.service';
import { AuthSignOutAction } from './services/auth-signout-action.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authSignInAction: AuthSignInAction,
    private authSignOutAction: AuthSignOutAction,
  ) {}
  @UseGuards(AuthSigninGuard)
  @HttpCode(HttpStatus.OK)
  @Post('')
  async signin(@Req() request: AppRequest) {
    const { user, accessToken, refreshToken } =
      await this.authSignInAction.execute(request);
    const { correlationId } = request;
    if (!user || !accessToken || !refreshToken) {
      throw new ServiceUnavailableException(correlationId);
    }

    request.res?.setHeader('accessToken', accessToken);
    request.res?.setHeader('refreshToken', refreshToken);

    return user;
  }

  @UseGuards(AuthJwtGuard)
  @Delete('')
  @HttpCode(HttpStatus.OK)
  async blackList(@Req() request: AppRequest) {
    return this.authSignOutAction.execute(request);
  }
}
