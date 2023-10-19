import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function ArchiveJobSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Excluir uma vaga pelo id.',
    }),
  );
}
