import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'lodash';
import { Repository } from 'typeorm';
import { RequestContext } from '../../../utils/request-context';
import { UserDto } from '../dtos/user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserGetProfileAction {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async execute(context: RequestContext): Promise<UserDto> {
    const { user } = context;
    const data = await this.userRepository.findOne({ id: user.id });
    if (!data) {
      throw new NotFoundException('User not found');
    }
    return <UserDto>(<unknown>omit(user, 'password'));
  }
}
