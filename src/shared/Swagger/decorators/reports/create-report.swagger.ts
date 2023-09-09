import { applyDecorators } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

export function CreateReportSwagger() {
    return applyDecorators(
        ApiOperation({
            summary: 'Criar um relatório.',
          })
    )
}