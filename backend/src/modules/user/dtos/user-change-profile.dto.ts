import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class UserChangeProfileDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  phoneNumber: number;
}
