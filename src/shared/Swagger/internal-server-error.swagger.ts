import { ApiProperty } from '@nestjs/swagger';

export class InternalServerErrorSwagger {
  @ApiProperty({ example: 'Erro interno do servidor.' })
  message: string;
}
