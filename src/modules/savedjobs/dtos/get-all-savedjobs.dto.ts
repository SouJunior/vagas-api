import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class GetAllSavedJobsDto {
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    required: false,
    description: 'ID do usuário que salvou a vaga',
    example: 'e2c1a2b7-8b4f-4c1b-bf94-2cb20de984d0',
  })
  userId?: string;

  @IsOptional()
  @IsUUID('4')
  @ApiProperty({
    required: false,
    description: 'ID da vaga salva (UUID v4)',
    example: '9f6a2e6a-4e9b-4b1e-9b7f-1a2b3c4d5e6f',
    format: 'uuid',
  })
  jobId?: string;
}
