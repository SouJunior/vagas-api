import { ApiProperty } from '@nestjs/swagger';
export class UnauthorizedSwagger {
  @ApiProperty({ example: 401 })
  statusCode: number;

  @ApiProperty({ example: 'Unauthorized' })
  message: string;
}
