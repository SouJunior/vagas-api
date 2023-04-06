import { ApiProperty } from '@nestjs/swagger';

export class GetByParamsDto {
  @ApiProperty({
    example: '30c75129-df8f-4b19-9331-239ec36ed923',
  })
  id: string;
}
