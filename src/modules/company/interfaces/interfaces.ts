import { CompaniesEntity } from 'src/database/entities/companies.entity';
import { IGlobalResponse } from 'src/shared/interfaces/interfaces';

interface ICompaniesResponseContent {
  message: string;
  content?: CompaniesEntity | CompaniesEntity[];
}

export interface ICompaniesResponse extends IGlobalResponse {
  data: ICompaniesResponseContent;
}
