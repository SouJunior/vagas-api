import { HttpStatus, applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { LoggerUserType } from "src/modules/auth/types/logged-user.types";
import { UnauthorizedSwagger } from "../../unauthorized.swagger";

export function UserLoggedSwagger(){
    return applyDecorators(
        ApiResponse({
            status: HttpStatus.OK,
            description: 'Exemplo do retorno de sucesso da rota',
            type: LoggerUserType,
          }),
          ApiResponse({
            status: HttpStatus.UNAUTHORIZED,
            description: 'Modelo de erro',
            type: UnauthorizedSwagger,
          }),
          ApiOperation({
            summary: 'Retorna usuário logado',
          })
    )
}