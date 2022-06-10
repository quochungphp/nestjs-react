import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { Match } from '../../../decorators/match.decorator';

export class UserChangePasswordDto {
  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @Match('password', { message: 'Password is not match' })
  passwordConfirm: string;
}
