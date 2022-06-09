import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AbstractDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  @ApiPropertyOptional()
  updatedAt?: Date;
}
