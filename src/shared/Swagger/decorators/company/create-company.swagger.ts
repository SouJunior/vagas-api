import { HttpStatus, applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateCompanyDto } from "src/modules/company/dtos/create-company.dto";
import { UnauthorizedSwagger } from "../unauthorized.swagger";
import { BadRequestSwagger } from "../bad-request.swagger";

export function CreateCompanySwagger() {
    return applyDecorators(
        ApiResponse({
            status: HttpStatus.OK,
            description: 'Exemplo do retorno de sucesso da rota',
            type: CreateCompanyDto,
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
            summary: 'Cadastrar uma empresa.',
          })
    )
}