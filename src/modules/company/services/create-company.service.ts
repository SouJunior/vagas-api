import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { CompanyRepository } from '../repository/company-repository';

@Injectable()
export class CreateCompanyService {
  constructor(
    private companyRepository: CompanyRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(data: CreateCompanyDto) {
    const { user_id } = data;

    const userExists = await this.userRepository.findOneById(user_id);

    if (!userExists) {
      throw new BadRequestException('User not Exists');
    }

    return this.companyRepository.createCompany(data);
  }
}
