import { HttpStatus, applyDecorators } from '@nestjs/common';
import { CreatePasswordHashDto } from 'src/modules/company/dtos/update-my-password.dto';
import { UnauthorizedSwagger } from '../../unauthorized.swagger';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BadRequestSwagger } from '../../bad-request.swagger';

export function UpdatePasswordSwagger() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Exemplo do retorno de sucesso da rota',
      type: CreatePasswordHashDto,
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
      summary: 'Company update password without recovery e-mail.',
    }),
  );
}
