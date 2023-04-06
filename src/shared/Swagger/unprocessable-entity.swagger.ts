import { ApiProperty } from '@nestjs/swagger';
export class UnprocessableEntitySwagger {
  @ApiProperty({ example: 422 })
  statusCode: number;

  @ApiProperty({ example: 'invalid input syntax for type uuid:' })
  message: string;

  @ApiProperty({ example: 'Unprocessable Entity' })
  error: string;
}
