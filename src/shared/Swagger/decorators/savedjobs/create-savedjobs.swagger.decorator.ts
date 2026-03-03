import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { NotFoundSwagger } from "../../not-found.swagger";
import { BadRequestSwagger } from "../../bad-request.swagger";
import { SavedJobsEntity } from "src/database/entities/savedjobs.entity";
import { ConflictSwagger } from "../../conflict.swagger";

export function SwaggerCreateSavedJobs() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Salvar uma vaga',
      description: 'Cria um novo registro de vaga salva para o usuário autenticado. Requer dados obrigatórios no corpo da requisição.',
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Vaga salva com sucesso. Retorna os dados do registro criado.',
      type: SavedJobsEntity,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Requisição inválida. Verifique os campos enviados no corpo da requisição.',
      type: BadRequestSwagger,
    }),
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description: 'Esta vaga já foi salva anteriormente pelo usuário.',
      type: ConflictSwagger,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Usuário ou vaga não encontrados.',
      type: NotFoundSwagger,
    }),
  );
}