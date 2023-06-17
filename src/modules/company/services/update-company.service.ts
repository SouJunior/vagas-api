import { Injectable } from '@nestjs/common';
import { CompaniesEntity } from '../../../database/entities/companies.entity';
import { FileUploadService } from '../../upload/upload.service';
import { UpdateCompanyDto } from '../dtos/update-company.dto';
import { CompanyRepository } from '../repository/company-repository';

@Injectable()
export class UpdateCompanyService {
  constructor(
    private companyRepository: CompanyRepository,
    private fileUploadService: FileUploadService,
  ) {}

  async execute(company: CompaniesEntity, data: UpdateCompanyDto, file) {
    if (file && !data.profileKey) {
      return {
        status: 400,
        data: {
          message: 'profileKey is required when file is send',
        },
      };
    }

    if (file) {
      await this.fileUploadService.deleteFile(data.profileKey);
      const { Location, key } = await this.fileUploadService.upload(file);
      data.profile = Location;
      data.profileKey = key;
    }

    delete data.file;

    await this.companyRepository.UpdateCompanyById(company.id, data);

    return {
      status: 200,
      data: {
        message: 'Company updated successfully',
      },
    };
  }
}
