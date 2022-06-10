import { ApiProperty } from '@nestjs/swagger';

export class AuthAccessTokenDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber: number;

  @ApiProperty()
  sessionId: string;

  iat?: number;

  exp?: number;
}
