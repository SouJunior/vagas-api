import { Chance } from 'chance';
import { CompaniesEntity } from '../../../src/database/entities/companies.entity';

const chance = new Chance();

export const companyMailMock = (): CompaniesEntity => ({
  id: chance.guid(),
  companyName: chance.company(),
  email: chance.email(),
  cnpj: '12345678000199',
  password: chance.hash({ length: 60 }),
  recoverPasswordToken: chance.string({
    length: 32,
    alpha: true,
    numeric: true,
  }),
  mailConfirm: false,
  created_at: new Date(),
  updated_at: new Date(),
  companyType: 'Tecnologia',
  companySize: 'SMALL_SIZE',
  uf: 'SP',
  otherSite: {
    instagram: chance.url(),
    linkedin: chance.url(),
    twitter: chance.url(),
  },
  companySite: chance.url(),
  description: chance.sentence(),
  profile: null,
  profileKey: null,
  jobs: [],
});

export const companyMailWithoutTokenMock = (): CompaniesEntity => ({
  ...companyMailMock(),
  recoverPasswordToken: null,
  mailConfirm: true,
});
