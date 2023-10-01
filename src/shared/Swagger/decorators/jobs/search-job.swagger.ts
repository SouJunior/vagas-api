import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function SearchJobSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Buscar vaga',
    }),
  );
}
