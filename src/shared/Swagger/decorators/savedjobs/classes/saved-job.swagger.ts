import { ApiProperty } from '@nestjs/swagger';

export class SavedJobSwagger {
  @ApiProperty({ example: 'uuid-saved-job-id' })
  id: string;

  @ApiProperty({ example: 'uuid-user-id' })
  userId: string;

  @ApiProperty({ example: 'uuid-job-id' })
  jobId: string;

  @ApiProperty({ example: '2025-09-12T12:00:00.000Z' })
  savedAt: Date;

  @ApiProperty({ example: '2025-10-12T12:00:00.000Z' })
  expiresAt: Date;
}
