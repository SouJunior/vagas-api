import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { CandidacyStatus } from 'src/database/entities/candidancy-status.enum';

export class UpdateCandidacyDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ enum: CandidacyStatus })
  @IsNotEmpty()
  @IsEnum(CandidacyStatus)
  status: CandidacyStatus;
}
