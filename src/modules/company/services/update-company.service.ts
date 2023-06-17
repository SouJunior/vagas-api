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
    const { Location, key } = await this.fileUploadService.upload(file);
    data.profile = Location;
    data.profileKey = key;
    await this.companyRepository.UpdateCompanyById(company.id, data);

    return {
      status: 200,
      data: {
        message: 'Company updated successfully',
      },
    };
  }
}
