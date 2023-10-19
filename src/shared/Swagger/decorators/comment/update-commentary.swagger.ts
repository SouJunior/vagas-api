import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function UpdateCommentarySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Atualizar um comentário por id.',
    }),
  );
}
