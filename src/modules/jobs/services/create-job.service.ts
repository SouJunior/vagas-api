import { BadRequestException, Injectable } from '@nestjs/common';
import { CompaniesEntity } from '../../../database/entities/companies.entity';
import { MailService } from '../../mails/mail.service';
import { CreateJobDto } from '../dtos/create-job.dto';
import { JobRepository } from '../repository/job.repository';

@Injectable()
export class CreateJobService {
  constructor(
    private jobRepository: JobRepository,
    private mailService: MailService,
  ) {}

  async execute(data: CreateJobDto, company: CompaniesEntity) {
    const { salaryMin, salaryMax } = data;

    if (salaryMin > salaryMax) {
      throw new BadRequestException(
        'Informe um valor final maior do que o valor inicial descrito',
      );
    }

    //data.company_id = company.id;
    await this.jobRepository.createNewJob(data);

    const options = {
      subject: 'Vaga criada com sucesso',
      template: './create',
      context: {
        name: company.companyName,
        url: '',
      },
      email: company.email,
    };

    await this.mailService.sendMail(options);

    return 'Vaga publicada com sucesso';
  }
}
