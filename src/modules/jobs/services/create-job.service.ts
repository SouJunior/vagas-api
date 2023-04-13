import { BadRequestException, Injectable } from '@nestjs/common';
import { CompaniesEntity } from '../../../database/entities/companies.entity';
import { MailService } from '../../mails/mail.service';
import { CreateJobDto } from '../dtos/create-job.dto';
import { JobsTypeContractEnum } from '../enums/job-contract-type.enum';
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
      contractText,
      affirmative,
      affirmativeType,
      city,
      typeContract,
    } = data;

    if (typeContract == JobsTypeContractEnum.OTHER && !contractText) {
      throw new BadRequestException(
        'Quando o contrato for OTHER, informar o tipo de contratação',
      );
    }

    if (typeContract != JobsTypeContractEnum.OTHER && contractText) {
      throw new BadRequestException(
        'Quando o contrato for diferente de OTHER, não informar o tipo de contratação',
      );
    }

    if (salaryMin > salaryMax) {
      throw new BadRequestException(
        'Informe um valor final maior do que o valor inicial descrito',
      );
    }

    if ((salaryMin && !salaryMax) || (!salaryMin && salaryMax)) {
      throw new BadRequestException('Informe um valor final e o valor inicial');
    }

    if (modality != JobsModalityEnum.REMOTE && (!federalUnit || !city)) {
      throw new BadRequestException(
        'Para vagas diferentes de remoto, obrigatorio inserir a unidade federativa',
      );
    }

    if (modality == JobsModalityEnum.REMOTE && (federalUnit || city)) {
      throw new BadRequestException(
        'Para vagas remotas o UF e cidade não são obrigatórios',
      );
    }

    if (!indefinideContract && !contractType) {
      throw new BadRequestException(
        'Quando o contrato não for indeterminado, informe o tempo de contrato(contractType)',
      );
    }

    if (indefinideContract && contractType) {
      throw new BadRequestException(
        'Quando o tempo de contrato for indefinido, não e necessario informar o(contractType)',
      );
    }

    if (affirmative && !affirmativeType) {
      throw new BadRequestException('Informe uma preferência de vaga');
    }

    if (!affirmative && affirmativeType) {
      throw new BadRequestException(
        'Quando a vaga não for afirmativa, não informar nenhum tipo de minorias',
      );
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
