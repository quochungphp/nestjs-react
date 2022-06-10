import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '../../shared/services/config/config.service';
import { AuthAccessTokenDto } from '../dtos/auth-access-token.dto';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtSecret,
    });
  }

  async validate(payload: AuthAccessTokenDto): Promise<AuthAccessTokenDto> {
    return payload;
  }
}
