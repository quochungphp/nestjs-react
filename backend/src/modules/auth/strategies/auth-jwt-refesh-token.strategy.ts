import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ConfigService } from '../../shared/services/config/config.service';
import { RequestContext } from '../../../utils/request-context';
import { tokenCacheKey } from '../../../utils/cache-keys';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { AuthRefreshTokenDto } from '../dtos/auth-refesh-token.dto';
import { UserDto } from '../../user/dtos/user.dto';

@Injectable()
export class AuthJwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: configService.jwtSecret,
      passReqToCallback: true,
    });
  }

  async validate(
    context: RequestContext,
    payload: AuthRefreshTokenDto,
  ): Promise<UserDto> {
    const { sessionId, id } = payload;
    const cacheKey = tokenCacheKey(`${sessionId}-${id}`);
    const hasCache = await this.cacheManager.get(cacheKey);
    if (hasCache) {
      throw new UnauthorizedException(`Expired session : ${sessionId}`);
    }

    const user = await this.userRepository.findOne({ id });

    if (user) {
      return <UserDto>user;
    }

    throw new UnauthorizedException('Refresh token is not valid');
  }
}
