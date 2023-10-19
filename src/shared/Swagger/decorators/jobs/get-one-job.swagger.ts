import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function GetOneJobSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Buscar uma vaga pelo id.',
    }),
  );
}
