import { BadRequestException, Injectable } from '@nestjs/common';
import { CompaniesEntity } from '../../../database/entities/companies.entity';
import { MailService } from '../../mails/mail.service';
import { CreateJobDto } from '../dtos/create-job.dto';
import { JobsModalityEnum } from '../enums/job-modality.enum';
import { JobRepository } from '../repository/job.resository';

@Injectable()
export class CreateJobService {
  constructor(
    private jobRepository: JobRepository,
    private mailService: MailService,
  ) {}

  async execute(data: CreateJobDto, company: CompaniesEntity) {
    const {
      salaryMin,
      salaryMax,
      federalUnit,
      modality,
      indefinideContract,
      contractType,
      affirmative,
      affirmativeType,
    } = data;

    if (salaryMin > salaryMax) {
      throw new BadRequestException(
        'Informe um valor final maior do que o valor inicial descrito',
      );
    }

    if (modality != JobsModalityEnum.REMOTE && !federalUnit) {
      throw new BadRequestException(
        'Para vagas diferentes de remoto, obrigatorio inserir a unidade federativa',
      );
    }
    if (!indefinideContract && !contractType) {
      throw new BadRequestException(
        'Quando o contrato não for indeterminado, informe o tempo de contrato(contractType)',
      );
    }

    if (affirmative && !affirmativeType) {
      throw new BadRequestException('Informe uma preferência de vaga');
    }

    data.company_id = company.id;
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
