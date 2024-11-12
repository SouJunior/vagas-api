import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateCandidacyDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', format: 'uuid' })
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', format: 'uuid' })
  jobId: string;
}
