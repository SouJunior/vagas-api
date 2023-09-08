import { applyDecorators } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

export function DeleteReportSwagger() {
    return applyDecorators(
        ApiOperation({
            summary: 'Excluir um relatório por id.',
          })
    )
}