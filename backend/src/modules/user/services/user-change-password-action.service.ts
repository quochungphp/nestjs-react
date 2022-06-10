import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'lodash';
import { Repository } from 'typeorm';
import { hashAndValidatePassword } from '../../../utils/hash-user';
import { RequestContext } from '../../../utils/request-context';
import { ConfigService } from '../../shared/services/config/config.service';
import { UserChangePasswordDto } from '../dtos/user-change-pasword.dto';
import { UserDto } from '../dtos/user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserChangePasswordAction {
  constructor(
    private configService: ConfigService,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}
  async execute(
    context: RequestContext,
    payload: UserChangePasswordDto,
  ): Promise<UserDto> {
    const { password } = payload;
    const { user } = context;
    const checkUser = await this.userRepository.findOne({
      email: user.email,
    });

    if (!checkUser) {
      throw new NotFoundException('User not found');
    }

    const { saltRounds } = this.configService;
    const hashPass = await hashAndValidatePassword(password, saltRounds);
    checkUser.password = hashPass;
    checkUser.save();

    return <UserDto>(<unknown>omit(user, 'password'));
  }
}
