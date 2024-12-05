import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BadRequestSwagger } from '../../bad-request.swagger';
import { CandidacyEntity } from 'src/database/entities/candidacy.entity';

export function CreateCandidacySwagger() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Exemplo do retorno de sucesso da rota',
      type: CandidacyEntity,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Modelo de erro',
      type: BadRequestSwagger,
    }),
    ApiOperation({
      summary: 'Rota para registrar uma candidatura',
    }),
  );
}
