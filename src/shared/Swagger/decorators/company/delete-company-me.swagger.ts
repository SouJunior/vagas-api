import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function DeleteCompanyMeSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Excluir minha empresa',
    }),
    ApiResponse({
      status: 200,
      description: 'Empresa excluída com sucesso',
    }),
    ApiResponse({
      status: 401,
      description: 'Não autorizado',
    }),
    ApiResponse({
      status: 404,
      description: 'Empresa não encontrada',
    }),
  );
}
