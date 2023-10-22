import { ApiProperty } from '@nestjs/swagger';
import { UserResponseLoginTypes } from '../types/user-response-login.types';

export class UserLoginResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkVtYWlsUGFyYVRlc3RlQHRlc3RlLmNvbSIsImlhdCI6MTY3OTcwODczNSwiZXhwIjoxNjc5Nzk1MTM1fQ.G1r68O4MNDXx_uy7AbgltEln2cOd7UGxw6jNXbF5HZ0',
    description: 'Token de autenticação JWT',
  })
  token: string;

  @ApiProperty({ example: UserResponseLoginTypes })
  info: UserResponseLoginTypes;
}
