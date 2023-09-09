import { applyDecorators, HttpStatus } from "@nestjs/common"
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { BadRequestSwagger } from "../../bad-request.swagger";
import { UnauthorizedSwagger } from "../../unauthorized.swagger";

export function SwaggerUpdateUser() {
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
            type: BadRequestSwagger,
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
            summary: 'Atualizar um usuário pelo ID',
          })        
    )
}