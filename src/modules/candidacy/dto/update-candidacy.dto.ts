import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { CandidacyStatus } from 'src/database/entities/candidancy-status.enum';

export class UpdateCandidacyDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(CandidacyStatus)
  status: CandidacyStatus;
}
