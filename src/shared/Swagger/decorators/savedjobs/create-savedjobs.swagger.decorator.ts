import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { NotFoundSwagger } from "../../not-found.swagger";
import { BadRequestSwagger } from "../../bad-request.swagger";

export function SwaggerCreateSavedJobs() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Cadastro realizado com sucesso. Retorna os dados do novo registro.',
      type: NotFoundSwagger,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Requisição inválida. Verifique os campos enviados no corpo da requisição.',
      type: BadRequestSwagger,
    }),
    ApiOperation({
        description: 'Endpoint responsável por criar uma vaga salva. Requer dados obrigatórios no corpo da requisição.',
    }),
  );
}
