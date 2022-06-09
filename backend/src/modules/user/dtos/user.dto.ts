import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { AbstractDto } from '../../../database/dtos/abstract.dto';
import { LOGIN_PROVIDER } from '../entities/user.entity';

export class UserDto extends AbstractDto {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  username: string;
  @Exclude()
  password: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phone: number;
  @ApiProperty()
  loginProvider: LOGIN_PROVIDER;

  @ApiProperty()
  token?: string;
}
