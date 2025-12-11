import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BadRequestSwagger } from '../../bad-request.swagger';
import { UnauthorizedSwagger } from '../../unauthorized.swagger';

export function PublishJobSwagger() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Vaga publicada com sucesso',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Modelo de erro',
      type: BadRequestSwagger,
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Não autorizado',
      type: UnauthorizedSwagger,
    }),
    ApiResponse({
      status: HttpStatus.FORBIDDEN,
      description: 'Sem permissão para modificar esta vaga',
    }),
    ApiOperation({
      summary: 'Publicar vaga a partir do rascunho',
    }),
  );
}
