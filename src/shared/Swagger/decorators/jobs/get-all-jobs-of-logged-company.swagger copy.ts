import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

/**
 * Creates a Swagger operation decorator for the "get all jobs" endpoint.
 *
 * Returns a composed decorator that applies ApiOperation with the summary
 * 'Buscar todas as vagas.' Intended to be used on controller methods to
 * attach OpenAPI/Swagger metadata describing an endpoint that retrieves all job listings.
 *
 * @returns A method decorator that adds the ApiOperation metadata to a controller route.
 */
export function GetAllJobsSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Buscar todas as vagas.',
    }),
  );
}
