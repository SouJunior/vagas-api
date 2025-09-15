import { ApiProperty } from '@nestjs/swagger';
import { SavedJobSwagger } from './saved-job.swagger';
import { MetaPaginationSwagger } from './meta-pagination.swagger';

export class SavedJobsListResponseSwagger {
  @ApiProperty({ type: [SavedJobSwagger] })
  data: SavedJobSwagger[];

  @ApiProperty({ type: MetaPaginationSwagger })
  meta: MetaPaginationSwagger;
}
