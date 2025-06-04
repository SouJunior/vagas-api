import { CurriculumEntity } from 'src/database/entities/curriculum.entity';
import { IGlobalResponse } from 'src/shared/interfaces/interfaces';

interface ICurriculumsResponseContent {
  message: string;
  content?: CurriculumEntity | CurriculumEntity[];
}

export interface ICurriculumsResponse extends IGlobalResponse {
  data: ICurriculumsResponseContent;
}
