import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'lodash';
import { Repository } from 'typeorm';
import { verify } from '../../../utils/hash-user';
import { UserDto } from '../../user/dtos/user.dto';
import { UserEntity } from '../../user/entities/user.entity';

@Injectable()
export class AuthValidateAction {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async execute(username: string, password: string): Promise<UserDto> {
    const user = await this.userRepository.findOne({ username });
    if (user) {
      await this.comparePassword(password, user.password || '');
      return <UserDto>(<unknown>omit(user, 'password'));
    }

    throw new NotFoundException('User', 'User not found');
  }

  private async comparePassword(
    password: string,
    verifyPassword: string,
  ): Promise<void> {
    const isComparePassword = await verify(password, verifyPassword);

    if (!isComparePassword) {
      throw new BadRequestException('Username and password are not correct');
    }
  }
}
