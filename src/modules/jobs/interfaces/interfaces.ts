import { JobsEntity } from 'src/database/entities/jobs.entity';
import { IGlobalResponse } from 'src/shared/interfaces/interfaces';

interface IJobsResponseContent {
  message: string;
  content?: JobsEntity | JobsEntity[];
}

export interface IJobsResponse extends IGlobalResponse {
  data: IJobsResponseContent;
}
