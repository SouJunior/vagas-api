import { Injectable } from '@nestjs/common';
import { CurriculumEntity } from '../../database/entities/curriculum.entity';
import { UsersEntity } from '../../database/entities/users.entity';
import { FileUploadService } from '../upload/upload.service';
import { CurriculumRepository } from './repository/curriculum-repository';
import { CreateCurriculumType } from './types/create-curriculum.type';

@Injectable()
export class CurriculumService {
  constructor(
    private fileUploadService: FileUploadService,
    private curriculumRepository: CurriculumRepository,
  ) {}

  async getALlCurriculum(user: UsersEntity): Promise<CurriculumEntity[]> {
    return this.curriculumRepository.findAllCurriculum(user.id);
  }

  async uploadCurriculum(file, user: UsersEntity) {
    if (!file) {
      return {
        status: 400,
        data: { message: 'File is required' },
      };
    }

    const { Location, key } = await this.fileUploadService.upload(file);

    if (!Location || !key) {
      return {
        status: 400,
        data: { message: 'Upload file' },
      };
    }

    const saveNewCurriculum: CreateCurriculumType = {
      file: Location,
      fileKey: key,
      user,
    };

    return this.curriculumRepository.saveCurriculum(saveNewCurriculum);
  }

  async deleteCurriculum(key: string) {
    await this.fileUploadService.deleteFile(key);
  }
}
