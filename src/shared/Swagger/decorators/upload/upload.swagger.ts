import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiProperty } from "@nestjs/swagger";

export function UploadSwagger() {
    return applyDecorators(
      ApiProperty(),
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