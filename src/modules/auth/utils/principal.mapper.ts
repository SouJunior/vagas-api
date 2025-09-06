import { UsersEntity } from '../../../database/entities/users.entity';
import { CompaniesEntity } from '../../../database/entities/companies.entity';
import {
  PublicUserPrincipal,
  PublicCompanyPrincipal,
} from '../types/principal.types';

export function mapUserToPrincipal(user: UsersEntity): PublicUserPrincipal {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    type: user.type,
    phone: user.phone,
    userType: 'user',
  };
}

export function mapCompanyToPrincipal(
  company: CompaniesEntity,
): PublicCompanyPrincipal {
  return {
    id: company.id,
    companyName: company.companyName,
    email: company.email,
    cnpj: company.cnpj,
    userType: 'company',
  };
}
