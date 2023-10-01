import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function GetOneCommentaryByIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Buscar um comentário por id.',
    }),
  );
}
