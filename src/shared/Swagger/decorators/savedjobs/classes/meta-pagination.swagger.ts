import { ApiProperty } from '@nestjs/swagger';

export class MetaPaginationSwagger {
  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  take: number;

  @ApiProperty({ example: 100 })
  itemCount: number;

  @ApiProperty({ example: 10 })
  pageCount: number;

  @ApiProperty({ example: true })
  hasPreviousPage: boolean;

  @ApiProperty({ example: false })
  hasNextPage: boolean;

  @ApiProperty({ example: 'createdAt' })
  orderByColumn: string;
}
