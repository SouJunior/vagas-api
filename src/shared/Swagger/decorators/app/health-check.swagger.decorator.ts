import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthCheckResponse } from './classes/health-check-response.swagger';

export function SwaggerHealthCheck() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Exemplo do retorno de sucesso da rota',
      type: HealthCheckResponse,
    }),
    ApiOperation({
      summary: 'Retorna status dos serviços de email e banco de dados',
    }),
  );
}
