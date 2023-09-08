import { applyDecorators } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

export function GetReportByIdSwagger() {
    return applyDecorators(
        ApiOperation({
            summary: 'Encontrar um relatório por id.',
          })
    )
}