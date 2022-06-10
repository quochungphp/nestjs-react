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
import { UserChangeProfileDto } from '../dtos/user-change-profile.dto';
import { UserDto } from '../dtos/user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserChangeProfileAction {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async execute(
    context: RequestContext,
    payload: UserChangeProfileDto,
    id: number,
  ): Promise<UserDto> {
    const { user } = context;

    if (user.id !== id) {
      throw new NotFoundException('User is not owner');
    }

    const checkUser = await this.userRepository.findOne({ id });
    if (!checkUser) {
      throw new NotFoundException('User not found');
    }

    const data = await this.userRepository.save({
      ...checkUser,
      ...payload,
      id,
    });

    return <UserDto>(<unknown>omit(data, 'password'));
  }
}
