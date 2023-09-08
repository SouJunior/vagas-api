import { applyDecorators } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

export function UpdateJobSwagger() {
    return applyDecorators(
        ApiOperation({
            summary: 'Atualizar uma vaga pelo id.',
          })
    )
}