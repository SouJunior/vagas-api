import { applyDecorators } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

export function GetAllReportsSwagger() {
    return applyDecorators(
        ApiOperation({
            summary: 'Encontrar todos os relatórios.',
          })
    )
}