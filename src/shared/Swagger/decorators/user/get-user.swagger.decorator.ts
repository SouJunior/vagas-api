import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BadRequestSwagger } from '../../bad-request.swagger';
import { UnprocessableEntitySwagger } from '../../unprocessable-entity.swagger';
import { CreateResponseSwagger } from './classes/create-response.swagger';



export function SwaggerGetUser() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Exemplo do retorno de sucesso da rota',
      type: CreateResponseSwagger,
    }),
    ApiResponse({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      description: 'Modelo de erro',
      type: UnprocessableEntitySwagger,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Modelo de erro',
      type: BadRequestSwagger,
    }),
    ApiOperation({
      summary: 'Ativar um usuário pelo ID',
    })
  );
}
