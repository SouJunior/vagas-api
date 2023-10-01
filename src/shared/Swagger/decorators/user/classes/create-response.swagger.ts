import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/shared/utils/userRole/userRole';

export class CreateResponseSwagger {
  @ApiProperty({
    example: 'Fulano de Tal',
  })
  name: string;

  @ApiProperty({
    example: 'johnsnow+2356@outlook.com',
  })
  email: string;

  @ApiProperty({
    example: '941fb31b-5799-44bc-9870-d7c1d5d2ec2c',
  })
  id: string;

  @ApiProperty({
    example: true,
  })
  policies: boolean;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.USER,
  })
  type: UserRole;

  @ApiProperty({
    example: '2023-04-06T01:48:41.314Z',
  })
  created_at: Date;

  @ApiProperty({
    example: '2023-04-06T01:48:41.314Z',
  })
  updated_at: Date;

  @ApiProperty({
    example: false,
  })
  mailConfirm: boolean;
}
