import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function GetAllCommentariesSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Encontrar todos os comentários.',
    }),
  );
}
