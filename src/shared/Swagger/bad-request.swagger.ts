import { ApiProperty } from '@nestjs/swagger';
export class BadRequestSwagger {
  @ApiProperty()
  message: string;
}
