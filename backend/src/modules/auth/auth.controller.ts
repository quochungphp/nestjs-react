import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  ServiceUnavailableException,
  UseGuards,
} from '@nestjs/common';
import { AppRequest } from '../../utils/app-request';
import { AuthSigninGuard } from './guards/auth-signin.guard';
import { AuthSigninAction } from './services/auth-signin-action.service';

@Controller('auth')
export class AuthController {
  constructor(private authSignInAction: AuthSigninAction) {}
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
}
