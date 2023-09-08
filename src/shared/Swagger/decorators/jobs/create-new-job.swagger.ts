import { HttpStatus, applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UnauthorizedSwagger } from "../../unauthorized.swagger";
import { BadRequestSwagger } from "../../bad-request.swagger";

export function CreateNewJobSwagger() {
    return applyDecorators(
        ApiResponse({
            status: HttpStatus.CREATED,
            description: 'Exemplo do retorno de sucesso da rota',
            type: 'Vaga publicada com sucesso',
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
            summary: 'Criar uma vaga!',
          }),
          ApiOperation({
            summary: 'Buscar todas as vagas.',
          })
    )
}