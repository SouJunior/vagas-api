import { StatusEnum } from '../../../src/shared/enums/status.enum';
import { JobsEntity } from '../../../src/database/entities/jobs.entity';
import { companyMailMock } from './company-mail.mock';

export const jobMailMock = (): JobsEntity => ({
  id: '456e7890-e89b-12d3-a456-426614174001',
  title: 'Desenvolvedor Frontend Junior',
  description: 'Vaga para desenvolvedor frontend com foco em React',
  prerequisites: 'Conhecimento em React, JavaScript, HTML, CSS',
  benefits: 'Vale alimentação, Vale transporte, Plano de saúde',
  type: 'JUNIOR',
  typeContract: 'CLT',
  contractText: null,
  salaryMin: 3000,
  salaryMax: 5000,
  modality: 'REMOTE',
  federalUnit: 'SP',
  city: 'São Paulo',
  openEndedContract: true,
  contractType: null,
  affirmative: false,
  affirmativeType: null,
  status: StatusEnum.ACTIVE,
  content: null,
  company_id: '123e4567-e89b-12d3-a456-426614174000',
  createdAt: new Date(),
  updatedAt: new Date(),
  company: companyMailMock(),
  applications: [],
  comments: [],
});

export const jobMailListMock = (): JobsEntity[] => [
  jobMailMock(),
  {
    ...jobMailMock(),
    id: '456e7890-e89b-12d3-a456-426614174002',
    title: 'Desenvolvedor Backend Junior',
    description: 'Vaga para desenvolvedor backend com foco em Node.js',
    prerequisites: 'Conhecimento em Node.js, TypeScript, Banco de dados',
  },
  {
    ...jobMailMock(),
    id: '456e7890-e89b-12d3-a456-426614174003',
    title: 'Desenvolvedor Fullstack Junior',
    description: 'Vaga para desenvolvedor fullstack',
    prerequisites: 'Conhecimento em React, Node.js, TypeScript',
  },
];
