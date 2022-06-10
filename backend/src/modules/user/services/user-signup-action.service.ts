import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { hashAndValidatePassword } from '../../../utils/hash-user';
import { RequestContext } from '../../../utils/request-context';
import { ConfigService } from '../../shared/services/config/config.service';
import { UserSignupDto } from '../dtos/user-signup.dto';
import { UserDto } from '../dtos/user.dto';
import { LOGIN_PROVIDER, UserEntity } from '../entities/user.entity';

@Injectable()
export class UserSignupAction {
  constructor(
    private configService: ConfigService,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}
  async execute(
    context: RequestContext,
    payload: UserSignupDto,
  ): Promise<UserDto> {
    const { email, password, username } = payload;
    const { correlationId } = context;
    const checkExistedUser = await this.userRepository
      .createQueryBuilder()
      .orWhere({
        email,
      })
      .orWhere({
        username,
      })
      .getOne();

    if (checkExistedUser) {
      throw new ConflictException('User has already conflicted');
    }

    const { saltRounds } = this.configService;
    const hashPass = await hashAndValidatePassword(password, saltRounds);

    const user = await this.userRepository.save({
      ...payload,
      password: hashPass,
      provider: LOGIN_PROVIDER.PASSWORD,
    });
    const { jwtSecret, accessTokenExpiry } = this.configService;
    const userToken = {
      ...user,
      sessionId: correlationId,
    };

    const token = this.jwtService.sign(userToken, {
      secret: jwtSecret,
      expiresIn: accessTokenExpiry,
    });

    const data = {
      ...user,
      token,
    };

    return data;
  }
}
