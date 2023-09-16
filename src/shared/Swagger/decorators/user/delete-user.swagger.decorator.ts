import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GetByParamsDto } from 'src/modules/user/dtos/get-by-params.dto';
import { BadRequestSwagger } from '../../bad-request.swagger';
import { NotFoundSwagger } from '../../not-found.swagger';
import { UnauthorizedSwagger } from '../../unauthorized.swagger';

export function SwaggerDeleteUser() {
    return applyDecorators(
        ApiResponse({
            status: HttpStatus.OK,
            description: 'Exemplo do retorno de sucesso da rota',
            type: NotFoundSwagger,
          }),
          ApiResponse({
            status: HttpStatus.UNAUTHORIZED,
            description: 'Modelo de erro',
            type: UnauthorizedSwagger,
          }),
          ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Modelo de erro',
            type: BadRequestSwagger,
          }),
          ApiOperation({
            summary: 'Deletar um usuário pelo ID',
          }),
          ApiParam({
            type: GetByParamsDto,
            name: '',
          })
    )
}