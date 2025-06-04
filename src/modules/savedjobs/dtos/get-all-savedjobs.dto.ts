import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

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
  @IsUUID()
  @ApiProperty({
    required: false,
    description: 'ID da vaga salva',
    example: 'job_abc123',
  })
  jobId?: string;
}
