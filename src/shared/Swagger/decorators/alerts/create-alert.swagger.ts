import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function CreateAlertSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Criar alerta de vaga',
    }),
  );
}
