import { ApiProperty } from '@nestjs/swagger';

export class CreateUsersSwagger {
  @ApiProperty({
    example: '941fb31b-5799-44bc-9870-d7c1d5d2ec2c',
  })
  id: string;

  @ApiProperty({
    example: 'Fulano de Tal',
  })
  name: string;

  @ApiProperty({
    example: 'johnsnow+2356@outlook.com',
  })
  email: string;

  @ApiProperty({
    example: '2023-04-06T01:48:41.314Z',
  })
  created_at: Date;
}

export class MetaPaginationSwagger {
  @ApiProperty({
    example: 'id',
  })
  orderByColumn: string;

  @ApiProperty({
    example: '10',
  })
  page: string;

  @ApiProperty({
    example: '10',
  })
  take: string;

  @ApiProperty({
    example: 22,
  })
  itemCount: number;

  @ApiProperty({
    example: 3,
  })
  pageCount: number;

  @ApiProperty({
    example: true,
  })
  hasPreviousPage: boolean;

  @ApiProperty({
    example: true,
  })
  hasNextPage: boolean;
}

export class ListResponseSwagger {
  @ApiProperty({
    isArray: true,
    type: CreateUsersSwagger,
  })
  data: CreateUsersSwagger[];

  @ApiProperty({
    isArray: false,
    type: MetaPaginationSwagger,
  })
  meta: MetaPaginationSwagger;
}
