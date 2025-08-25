import { jobMailListMock } from './job-mail.mock';

export const mailOptionsMock = () => ({
  subject: 'Teste de Email',
  template: './test-template',
  context: {
    name: 'Usuario Teste',
    message: 'Esta é uma mensagem de teste',
    url: 'https://example.com/test',
  },
  email: 'test@example.com',
});

export const jobAlertMailOptionsMock = () => ({
  email: 'candidate@example.com',
  jobs: jobMailListMock(),
});
