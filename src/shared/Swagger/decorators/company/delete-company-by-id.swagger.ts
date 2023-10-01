import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CompanyIdDto } from 'src/modules/company/dtos/company-id.dto';
import { UnauthorizedSwagger } from '../../unauthorized.swagger';
import { BadRequestSwagger } from '../../bad-request.swagger';

export function DeleteCompanyByIdSwagger() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Exemplo do retorno de sucesso da rota',
      type: CompanyIdDto,
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
      summary: 'Excluir uma empresa por id.',
    }),
  );
}
