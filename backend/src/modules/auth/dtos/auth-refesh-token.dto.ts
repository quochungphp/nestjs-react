import { ApiProperty } from '@nestjs/swagger';

export class AuthRefreshTokenDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  sessionId: string;

  @ApiProperty()
  iat?: number;

  @ApiProperty()
  exp?: number;
}
