import { HttpStatus, applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UpdateCompanyDto } from "src/modules/company/dtos/update-company.dto";
import { UnauthorizedSwagger } from "../unauthorized.swagger";
import { BadRequestSwagger } from "../bad-request.swagger";

export function UpdateCompanyByIdSwagger() {
    return applyDecorators(
        ApiBody({
            description: 'Upload images',
            schema: {
              type: 'object',
              properties: {
                file: {
                  type: 'string',
                  format: 'binary',
                },
              },
            },
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
          })
    )
}