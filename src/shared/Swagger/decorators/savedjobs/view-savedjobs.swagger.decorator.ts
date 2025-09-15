import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SavedJobsListResponseSwagger } from './classes/list-response.swagger';
import { UnauthorizedSwagger } from '../../unauthorized.swagger';
import { BadRequestSwagger } from '../../bad-request.swagger';
import { InternalServerErrorSwagger } from '../../internal-server-error.swagger';

export function SwaggerFindSavedJobs() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Sucesso na rota. Exemplo de sucesso: ',
      type: SavedJobsListResponseSwagger,
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Não autorizado.',
      type: UnauthorizedSwagger,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Requisição inválida.',
      type: BadRequestSwagger,
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Erro interno do servidor.',
      type: InternalServerErrorSwagger,
    }),
    ApiOperation({
      summary: 'Visualizar todas as vagas salvas.',
    }),
  );
}
