import { CompaniesEntity } from '../../../src/database/entities/companies.entity';

export const companyMailMock = (): CompaniesEntity => ({
  id: '123e4567-e89b-12d3-a456-426614174000',
  companyName: 'Test Company LTDA',
  email: 'company@example.com',
  cnpj: '12345678000199',
  password: 'hashedPassword123',
  recoverPasswordToken: 'company-recover-token-456',
  mailConfirm: false,
  created_at: new Date('2023-01-01T00:00:00.000Z'),
  updated_at: new Date('2023-01-01T00:00:00.000Z'),
  companyType: 'Tecnologia',
  companySize: 'SMALL_SIZE',
  uf: 'SP',
  otherSite: {
    instagran: 'https://instagram.com/testcompany',
    linkedin: 'https://linkedin.com/company/testcompany',
    twitter: 'https://twitter.com/testcompany',
  },
  companySite: 'https://testcompany.com.br',
  description: 'Empresa de tecnologia focada em soluções inovadoras',
  profile: null,
  profileKey: null,
  jobs: [],
});

export const companyMailWithoutTokenMock = (): CompaniesEntity => ({
  ...companyMailMock(),
  recoverPasswordToken: null,
  mailConfirm: true,
});
