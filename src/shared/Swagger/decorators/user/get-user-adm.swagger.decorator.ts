import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GetByParamsDto } from 'src/modules/user/dtos/get-by-params.dto';
import { BadRequestSwagger } from '../../bad-request.swagger';
import { UnauthorizedSwagger } from '../../unauthorized.swagger';
import { CreateResponseSwagger } from '../../user/create-response.swagger';


export function SwaggerGetUserAdm() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Exemplo do retorno de sucesso da rota',
      type: CreateResponseSwagger,
    }),
    ApiResponse({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      description: 'Modelo de erro',
      type: UnauthorizedSwagger,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Modelo de erro',
      type: BadRequestSwagger,
    }),
    ApiOperation({
      summary: 'Visualizar um usuário pelo ID (precisa ser adm)',
    }),
    ApiParam({
      type: GetByParamsDto,
      name: '',
    })
  );
}
