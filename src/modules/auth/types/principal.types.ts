export interface PublicUserPrincipal {
  id: string;
  name: string;
  email: string;
  type: string;
  phone?: string;
  userType: 'user';
}

export interface PublicCompanyPrincipal {
  id: string;
  companyName: string;
  email: string;
  cnpj: string;
  userType: 'company';
}

export type AuthenticatedPrincipal =
  | PublicUserPrincipal
  | PublicCompanyPrincipal;
