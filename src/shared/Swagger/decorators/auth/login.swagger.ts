import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserLoginResponseDto } from 'src/modules/auth/dtos/user-login-response.dto';
import { BadRequestSwagger } from '../../bad-request.swagger';

export function LoginSwagger() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Exemplo do retorno de sucesso da rota',
      type: UserLoginResponseDto,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Modelo de erro',
      type: BadRequestSwagger,
    }),
    ApiOperation({
      summary: 'Rota para fazer login na plataforma',
    }),
  );
}
