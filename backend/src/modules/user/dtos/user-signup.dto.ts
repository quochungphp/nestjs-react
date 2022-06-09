import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  IsLowercase,
  IsEmail,
  IsString,
  MinLength,
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';

export class UserSignupDto {
  @ApiProperty({})
  @MaxLength(50)
  @IsLowercase()
  @IsEmail()
  email: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({})
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({})
  @IsNumber()
  phone: number;
}
