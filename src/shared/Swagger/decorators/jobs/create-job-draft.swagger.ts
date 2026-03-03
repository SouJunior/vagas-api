import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BadRequestSwagger } from '../../bad-request.swagger';
import { UnauthorizedSwagger } from '../../unauthorized.swagger';

export function CreateJobDraftSwagger() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Rascunho criado com sucesso',
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
    ApiOperation({
      summary: 'Criar rascunho de vaga',
    }),
  );
}
