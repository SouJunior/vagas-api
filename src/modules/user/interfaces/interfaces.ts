import { UsersEntity } from 'src/database/entities/users.entity';
import { IGlobalResponse } from 'src/shared/interfaces/interfaces';

interface IUsersResponseContent {
  message: string;
  content?: UsersEntity | UsersEntity[];
}

export interface IUsersResponse extends IGlobalResponse {
  data: IUsersResponseContent;
}
