import { AuthAccessTokenDto } from './auth-access-token.dto';

export class AuthSigninDto {
  user: AuthAccessTokenDto;

  accessToken: string;

  refreshToken: string;
}
