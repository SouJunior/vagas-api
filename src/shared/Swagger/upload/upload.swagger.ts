import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";

export function UploadSwagger() {
    return applyDecorators(
      ApiConsumes('multipart/form-data'),
      ApiBody({
        description: 'Upload images',
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
            },
          },
        }
      })
    )
    
}