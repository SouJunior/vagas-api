import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function GetAllJobsOfLoggedCompanySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Buscar todas as vagas da empresa logada.',
    }),
  );
}
