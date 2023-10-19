import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function DeleteCommentarySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Excluir um comentário por id.',
    }),
  );
}
