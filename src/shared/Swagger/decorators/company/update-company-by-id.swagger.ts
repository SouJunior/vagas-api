import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UpdateCompanyDto } from 'src/modules/company/dtos/update-company.dto';
import { BadRequestSwagger } from '../../bad-request.swagger';
import { UnauthorizedSwagger } from '../../unauthorized.swagger';

export function UpdateCompanyByIdSwagger() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      type: 'string',
    }),
    ApiBody({
      type: UpdateCompanyDto,
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Exemplo do retorno de sucesso da rota',
      type: UpdateCompanyDto,
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
      summary: 'Atualizar uma empresa por id.',
    }),
  );
}
