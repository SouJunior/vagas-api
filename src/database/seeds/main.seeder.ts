import { AppDataSource } from '../data-source';
import { UsersEntity } from '../entities/users.entity';
import { CompaniesEntity } from '../entities/companies.entity';
import { JobsEntity } from '../entities/jobs.entity';
import { PersonalDataEntity } from '../entities/personal-data.entity';
import { CompanySizeEnum } from '../../modules/company/enum/company-size.enum';
import { JobsTypeEnum } from '../../modules/jobs/enums/job-type.enum';
import { JobsTypeContractEnum } from '../../modules/jobs/enums/job-contract-type.enum';
import { JobsModalityEnum } from '../../modules/jobs/enums/job-modality.enum';
import * as bcrypt from 'bcrypt';

async function seed() {
  console.log('Iniciando o seeding do banco de dados...');

  await AppDataSource.initialize();
  console.log('Data Source inicializado!');

  const userRepository = AppDataSource.getRepository(UsersEntity);
  const companyRepository = AppDataSource.getRepository(CompaniesEntity);
  const jobRepository = AppDataSource.getRepository(JobsEntity);
  const personalDataRepository =
    AppDataSource.getRepository(PersonalDataEntity);

  // Limpando tabelas (opcional, mas útil para o seed ser reproduzível)
  console.log('Limpando dados existentes...');
  await jobRepository.delete({});
  await userRepository.delete({});
  await companyRepository.delete({});
  await personalDataRepository.delete({});

  const hashedPassword = await bcrypt.hash('password123', 10);

  // Criar Dados Pessoais
  console.log('Criando dados pessoais...');
  const personalData1 = personalDataRepository.create({
    birth: new Date('1990-01-01'),
    gender: 'CIS_MALE',
    pcd: false,
    st_adress: 'Rua Exemplo, 123',
    city: 'São Paulo',
    region: 'SP',
  });
  await personalDataRepository.save(personalData1);

  // Criar Usuário
  console.log('Criando usuários...');
  const user1 = userRepository.create({
    name: 'João Silva',
    email: 'joao@example.com',
    password: hashedPassword,
    type: 'USER',
    phone: '11999999999',
    city: 'São Paulo',
    state: 'SP',
    mailConfirm: true,
    personalData: personalData1,
  });
  await userRepository.save(user1);

  const admin1 = userRepository.create({
    name: 'Admin Sou Junior',
    email: 'admin@soujunior.com',
    password: hashedPassword,
    type: 'ADMIN',
    mailConfirm: true,
  });
  await userRepository.save(admin1);

  // Criar Empresa
  console.log('Criando empresas...');
  const company1 = companyRepository.create({
    companyName: 'Tech Solutions',
    email: 'contato@techsolutions.com',
    password: hashedPassword,
    cnpj: '12.345.678/0001-90',
    companySize: CompanySizeEnum.SMALL_SIZE,
    uf: 'SP',
    description: 'Uma empresa focada em soluções inovadoras.',
    mailConfirm: true,
  });
  await companyRepository.save(company1);

  const company2 = companyRepository.create({
    companyName: 'Global Corp',
    email: 'hr@globalcorp.com',
    password: hashedPassword,
    cnpj: '98.765.432/0001-21',
    companySize: CompanySizeEnum.BIG_SIZE,
    uf: 'RJ',
    description: 'Gigante global de tecnologia.',
    mailConfirm: true,
  });
  await companyRepository.save(company2);

  // Criar Vagas
  console.log('Criando vagas...');
  const job1 = jobRepository.create({
    title: 'Desenvolvedor Node.js Junior',
    description: 'Buscamos desenvolvedores Node.js apaixonados por aprender.',
    prerequisites: 'Conhecimento em TypeScript, NestJS e TypeORM.',
    benefits: 'Vale Refeição, Plano de Saúde, Home Office.',
    type: JobsTypeEnum.JUNIOR,
    typeContract: JobsTypeContractEnum.CLT,
    salaryMin: 3000,
    salaryMax: 5000,
    modality: JobsModalityEnum.REMOTE,
    company: company1,
  });
  await jobRepository.save(job1);

  const job2 = jobRepository.create({
    title: 'Estágio em Frontend (React)',
    description: 'Oportunidade de estágio para estudantes de tecnologia.',
    prerequisites: 'Conhecimento básico em React, HTML, CSS e JavaScript.',
    benefits: 'Bolsa Auxílio, Vale Transporte.',
    type: JobsTypeEnum.INTERNSHIP,
    typeContract: JobsTypeContractEnum.OTHER,
    salaryMin: 1200,
    salaryMax: 1500,
    modality: JobsModalityEnum.HYBRID,
    city: 'Rio de Janeiro',
    federalUnit: 'RJ',
    company: company2,
  });
  await jobRepository.save(job2);

  const job3 = jobRepository.create({
    title: 'Analista de Sistemas Pleno',
    description:
      'Vaga para analista com experiência em arquitetura de sistemas.',
    prerequisites:
      'Experiência sólida com bancos de dados e design de sistemas.',
    benefits: 'Participação nos lucros, Horário flexível.',
    type: JobsTypeEnum.ANALYST,
    typeContract: JobsTypeContractEnum.PJ,
    salaryMin: 8000,
    salaryMax: 12000,
    modality: JobsModalityEnum.ON_SITE,
    city: 'São Paulo',
    federalUnit: 'SP',
    company: company1,
  });
  await jobRepository.save(job3);

  console.log('Seeding concluído com sucesso!');
  await AppDataSource.destroy();
}

seed().catch((error) => {
  console.error('Erro ao realizar o seeding:', error);
  process.exit(1);
});
