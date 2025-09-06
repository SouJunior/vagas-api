import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function GetAllJobsSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Buscar todas as vagas.',
    }),
  );
}
