/**
 * Constantes de teste para evitar hardcoding de senhas e dados sensíveis
 * Configurações centralizadas para todos os mocks e testes
 */

// Senhas para testes - centralizadas para evitar hardcoding
export const TEST_PASSWORDS = {
  // Senha válida para testes de login
  VALID_LOGIN: process.env.TEST_VALID_PASSWORD || 'Test@1234',

  // Senha inválida para testes de falha de login
  INVALID_LOGIN: process.env.TEST_INVALID_PASSWORD || 'WrongPassword@123',

  // Senha simples para testes de validação
  SIMPLE: process.env.TEST_SIMPLE_PASSWORD || '123',

  // Senha muito simples para testes de entidade
  BASIC: process.env.TEST_BASIC_PASSWORD || '1234',

  // Senha genérica para testes de update
  GENERIC: process.env.TEST_GENERIC_PASSWORD || 'password',

  // Senha para criação de usuário
  CREATE_USER: process.env.TEST_CREATE_USER_PASSWORD || 'teste@12A',

  // Senha hasheada simulada
  HASHED: process.env.TEST_HASHED_PASSWORD || 'hashedPassword',

  // Senha hasheada com bcrypt simulada
  HASHED_BCRYPT:
    process.env.TEST_HASHED_BCRYPT_PASSWORD || '$2b$10$hashedpassword',

  // Senha sensível para testes de filtro
  SENSITIVE: process.env.TEST_SENSITIVE_PASSWORD || 'sensitivePassword',

  // Token de senha para testes de recuperação
  TOKEN: process.env.TEST_PASSWORD_TOKEN || '123',

  // Senha diferente para testes de confirmação
  DIFFERENT: process.env.TEST_DIFFERENT_PASSWORD || 'different123',
} as const;

// Tokens para testes
export const TEST_TOKENS = {
  // Token JWT para testes
  JWT_SECRET:
    process.env.TEST_JWT_SECRET || 'test-jwt-secret-key-for-e2e-tests',

  // Token de recuperação de senha
  RECOVERY_TOKEN:
    process.env.TEST_RECOVERY_TOKEN || '729c7919-583c-40a5-b0ca-137e282345d4',
} as const;

// IDs para testes
export const TEST_IDS = {
  USER_ID: '729c7919-583c-40a5-b0ca-137e282345d4',
  COMPANY_ID: '829c7919-583c-40a5-b0ca-137e282345d5',
} as const;

// IPs para testes - usando endereços de documentação RFC-compliant
// SECURITY NOTE: Todos os IPs abaixo são SEGUROS para uso em testes:
// - São endereços reservados pelos RFCs para documentação e testes
// - NÃO representam endereços de rede reais ou sensíveis
// - São especificamente designados para uso em código de exemplo
export const TEST_IPS = {
  // Localhost - endereço de loopback padrão para testes locais
  LOCALHOST: process.env.TEST_IP_LOCALHOST || '127.0.0.1',

  // RFC 5737 - Endereços reservados para documentação (TEST-NET-1)
  // 192.0.2.0/24 é reservado para documentação e não deve ser usado em produção
  DOCUMENTATION_IP: process.env.TEST_IP_DOCUMENTATION || '192.0.2.1',

  // RFC 5737 - Endereços reservados para documentação (TEST-NET-2)
  // 198.51.100.0/24 é reservado para documentação e exemplos
  EXAMPLE_IP: process.env.TEST_IP_EXAMPLE || '198.51.100.1',
} as const;

// Emails para testes
export const TEST_EMAILS = {
  DEFAULT_USER: 'user@teste.com',
  COMPANY: 'company@test.com',
  UNCONFIRMED_COMPANY: 'unconfirmed@test.com',
  VALID_LOGIN_USER: 'test@test.com',
  INVALID: 'invalid@test.com',
} as const;

// Dados de empresa para testes
export const TEST_COMPANY_DATA = {
  NAME: 'Test Company Ltd',
  CNPJ: '12345678000123',
  UNCONFIRMED_CNPJ: '12345678000124',
} as const;

// Dados de usuário para testes
export const TEST_USER_DATA = {
  NAME: 'Non-Admin for tests',
  CPF: '12345678910',
  PHONE: '11987654321',
  MAIN_PHONE: '11999999999',
  SECONDARY_PHONE: '11888888888',
} as const;
