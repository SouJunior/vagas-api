import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BadRequestSwagger } from '../../bad-request.swagger';
import { UnauthorizedSwagger } from '../../unauthorized.swagger';
import { RecoveryPasswordSwagger } from '../../user/recovery-password.swagger';

export function SwaggerRecoverEmail() {
    return applyDecorators(
        ApiResponse({
            status: HttpStatus.OK,
            description: 'Exemplo do retorno de sucesso da rota',
            type: RecoveryPasswordSwagger,
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
            summary: 'Send email to recovery password.',
        }),
    )
}