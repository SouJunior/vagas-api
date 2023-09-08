import { applyDecorators } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

export function UpdateReportSwagger() {
    return applyDecorators(
        ApiOperation({
            summary: 'Atualizar um relatório por id.',
          })
    )
}