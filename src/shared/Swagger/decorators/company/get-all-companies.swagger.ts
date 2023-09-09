import { HttpStatus, applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { BadRequestSwagger } from "../../bad-request.swagger";
import { UnauthorizedSwagger } from "../../unauthorized.swagger";
import { PageOptionsDto } from "src/shared/pagination";

export function GetAllCompaniesSwagger() {
    return applyDecorators(
        ApiResponse({
            status: HttpStatus.OK,
            description: 'Exemplo do retorno de sucesso da rota',
            type: PageOptionsDto,
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
            summary: 'Buscar todas as empresas.',
          })
    )
}