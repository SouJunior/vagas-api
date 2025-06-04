import { ApiProperty } from '@nestjs/swagger';

export class ConflictSwagger {
  @ApiProperty()
  message: string;
}
