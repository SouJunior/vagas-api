import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { CompanyRepository } from '../repository/company.repository';

@Injectable()
export class DeleteCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(id: string): Promise<{ data: object; status: number }> {
    const data = await this.companyRepository.deleteCompanyById(id);

    if (
      !data ||
      (typeof data === 'object' && 'affected' in data && data.affected === 0)
    ) {
      throw new NotFoundException(`Company with id ${id} not found`);
    }

    return {
      data,
      status: HttpStatus.OK,
    };
  }
}
