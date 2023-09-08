import { HttpStatus, applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { EmailDto } from "src/modules/user/dtos/email-user.dto";
import { UnauthorizedSwagger } from "../unauthorized.swagger";
import { BadRequestSwagger } from "../bad-request.swagger";

export function RecoverPasswordByEmailSwagger() {
    return applyDecorators(
        ApiResponse({
            status: HttpStatus.OK,
            description: 'Exemplo do retorno de sucesso da rota',
            type: EmailDto,
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
          })
    )
}