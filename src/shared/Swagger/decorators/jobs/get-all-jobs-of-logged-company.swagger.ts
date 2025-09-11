import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

/**
 * Swagger decorator that documents an operation to fetch all jobs for the currently logged-in company.
 *
 * Applies an `ApiOperation` metadata entry (summary: "Buscar todas as vagas da empresa logada.") to a route handler,
 * so the route appears in Swagger/OpenAPI documentation with that summary.
 *
 * @returns A composed NestJS decorator (to be applied to controller route handlers) that sets the Swagger operation metadata.
 */
export function GetAllJobsOfLoggedCompanySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Buscar todas as vagas da empresa logada.',
    }),
  );
}
