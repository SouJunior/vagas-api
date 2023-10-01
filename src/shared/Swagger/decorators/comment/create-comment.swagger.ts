import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function CreateCommentSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Cadastrar um comentário.',
    }),
  );
}
