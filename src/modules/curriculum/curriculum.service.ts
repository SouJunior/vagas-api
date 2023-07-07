import { Injectable } from '@nestjs/common';
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

  async getALlCurriculum(
    user: UsersEntity,
  ): Promise<{ status: number; data: any }> {
    const curriculuns = await this.curriculumRepository.findAllCurriculum(
      user.id,
    );

    return {
      status: 200,
      data: curriculuns,
    };
  }

  async uploadCurriculum(
    file,
    user: UsersEntity,
  ): Promise<{ status: number; data: any }> {
    if (!file) {
      return {
        status: 400,
        data: { message: 'File is required' },
      };
    }

    const { Location, key } = await this.fileUploadService.upload(
      file,
      'application/pdf',
    );

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

    const curriculuns = await this.curriculumRepository.saveCurriculum(
      saveNewCurriculum,
    );

    return {
      status: 200,
      data: curriculuns,
    };
  }

  async deleteCurriculum(key: string) {
    await this.fileUploadService.deleteFile(key);

    await this.curriculumRepository.deleteByKey(key);

    return { message: 'Deleted successfully' };
  }
}
