import { ApplicationEntity } from 'src/database/entities/applications.entity';
import { IGlobalResponse } from 'src/shared/interfaces/interfaces';

interface IApplicationsResponseContent {
  message: string;
  content?: ApplicationEntity | ApplicationEntity[];
}

export interface IApplicationsResponse extends IGlobalResponse {
  data: IApplicationsResponseContent;
}
