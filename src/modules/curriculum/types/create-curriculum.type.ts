import { UsersEntity } from '../../../database/entities/users.entity';

export type CreateCurriculumType = {
  file: string;
  fileKey: string;
  user: UsersEntity;
};
