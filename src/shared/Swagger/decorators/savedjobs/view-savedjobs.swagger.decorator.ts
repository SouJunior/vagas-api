import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ListResponseSwagger } from '../user/classes/list-response.swagger';
import { UnauthorizedSwagger } from '../../unauthorized.swagger';
import { BadRequestSwagger } from '../../bad-request.swagger';

export function SwaggerFindSavedJobs() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Sucesso na rota. Exemplo de sucesso: ',
      type: ListResponseSwagger,
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Não autorizado.',
      type: UnauthorizedSwagger,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Erro no servidor.',
      type: BadRequestSwagger,
    }),
    ApiOperation({
      summary: 'Visualizar todas as aplicações salvas.',
    }),
  );
}
