import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import {
  userMailMock,
  userMailWithoutTokenMock,
} from '../../../mocks/mail/user-mail.mock';
import {
  companyMailMock,
  companyMailWithoutTokenMock,
} from '../../../mocks/mail/company-mail.mock';
import {
  jobMailListMock,
  jobMailMock,
} from '../../../mocks/mail/job-mail.mock';
import { mailOptionsMock } from '../../../mocks/mail/mail-options.mock';
import { MailService } from '../../../../src/modules/mails/mail.service';

const mailerServiceMock = {
  sendMail: jest.fn(),
};

describe('MailService', () => {
  let service: MailService;
  let mailerService: { sendMail: jest.Mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        MailService,
        {
          provide: MailerService,
          useValue: mailerServiceMock,
        },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
    mailerService = module.get(MailerService);

    process.env.FRONTEND_URL = 'https://frontend.test.com';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendUserConfirmation', () => {
    it('should send password recovery email when user has recoverPasswordToken', async () => {
      const user = userMailMock();
      mailerService.sendMail.mockResolvedValue(undefined);

      await service.sendUserConfirmation(user);

      expect(mailerService.sendMail).toHaveBeenCalledTimes(1);
      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: user.email,
        subject: 'Recuperação de Senha!',
        template: './send',
        context: {
          name: user.name,
          url: `${process.env.FRONTEND_URL}/recovery-password?token=${user.recoverPasswordToken}&type=USER`,
        },
      });
    });

    it('should send password update confirmation email when user has no recoverPasswordToken', async () => {
      const user = userMailWithoutTokenMock();
      mailerService.sendMail.mockResolvedValue(undefined);

      await service.sendUserConfirmation(user);

      expect(mailerService.sendMail).toHaveBeenCalledTimes(1);
      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: user.email,
        subject: 'Senha alterada com Sucesso!',
        template: './passwordupdate',
        context: {
          name: user.name,
          url: `${process.env.FRONTEND_URL}/recovery-password?token=null&type=USER`,
        },
      });
    });
  });

  describe('sendUserCreationConfirmation', () => {
    it('should send user creation confirmation email', async () => {
      const user = userMailMock();
      mailerService.sendMail.mockResolvedValue(undefined);

      await service.sendUserCreationConfirmation(user);

      expect(mailerService.sendMail).toHaveBeenCalledTimes(1);
      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: user.email,
        subject: 'Usuário criado!',
        template: './confirmEmailUser',
        context: {
          name: user.name,
          url: `${process.env.FRONTEND_URL}/userconfirmation?id=${user.id}&type=USER`,
        },
      });
    });

    it('should return void when email is sent successfully', async () => {
      const user = userMailMock();
      mailerService.sendMail.mockResolvedValue(undefined);
      const result = await service.sendUserCreationConfirmation(user);
      expect(result).toBeUndefined();
    });
  });

  describe('sendCompanyConfirmation', () => {
    it('should send password recovery email when company has recoverPasswordToken', async () => {
      const company = companyMailMock();
      mailerService.sendMail.mockResolvedValue(undefined);

      await service.sendCompanyConfirmation(company);

      expect(mailerService.sendMail).toHaveBeenCalledTimes(1);
      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: company.email,
        subject: 'Recuperação de Senha!',
        template: './send',
        context: {
          name: company.companyName,
          url: `${process.env.FRONTEND_URL}/recovery-password?token=${company.recoverPasswordToken}&type=COMPANY`,
        },
      });
    });

    it('should send password update confirmation email when company has no recoverPasswordToken', async () => {
      const company = companyMailWithoutTokenMock();
      mailerService.sendMail.mockResolvedValue(undefined);

      await service.sendCompanyConfirmation(company);

      expect(mailerService.sendMail).toHaveBeenCalledTimes(1);
      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: company.email,
        subject: 'Senha alterada com Sucesso!',
        template: './passwordupdate',
        context: {
          name: company.companyName,
        },
      });
    });
  });

  describe('sendCompanyCreationConfirmation', () => {
    it('should send company creation confirmation email', async () => {
      const company = companyMailMock();
      mailerService.sendMail.mockResolvedValue(undefined);

      await service.sendCompanyCreationConfirmation(company);

      expect(mailerService.sendMail).toHaveBeenCalledTimes(1);
      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: company.email,
        subject: 'Empresa criada!',
        template: './confirmEmailCompany',
        context: {
          name: company.companyName,
          url: `${process.env.FRONTEND_URL}/companyconfirmation?id=${company.id}&type=COMPANY`,
        },
      });
    });

    it('should return void when email is sent successfully', async () => {
      const company = companyMailMock();
      mailerService.sendMail.mockResolvedValue(undefined);
      const result = await service.sendCompanyCreationConfirmation(company);
      expect(result).toBeUndefined();
    });
  });

  describe('sendJobAlerts', () => {
    it('should send job alerts email with jobs list', async () => {
      const email = 'candidate@example.com';
      const jobs = jobMailListMock();
      mailerService.sendMail.mockResolvedValue(undefined);

      await service.sendJobAlerts(email, jobs);

      expect(mailerService.sendMail).toHaveBeenCalledTimes(1);
      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: email,
        subject: 'Vagas Relevantes para Você',
        template: './jobsAlert',
        context: {
          jobs,
        },
      });
    });

    it('should send job alerts email with empty jobs list', async () => {
      const email = 'candidate@example.com';
      const jobs = [];
      mailerService.sendMail.mockResolvedValue(undefined);

      await service.sendJobAlerts(email, jobs);

      expect(mailerService.sendMail).toHaveBeenCalledTimes(1);
      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: email,
        subject: 'Vagas Relevantes para Você',
        template: './jobsAlert',
        context: {
          jobs,
        },
      });
    });

    it('should send job alerts email with single job', async () => {
      const email = 'candidate@example.com';
      const jobs = [jobMailMock()];
      mailerService.sendMail.mockResolvedValue(undefined);

      await service.sendJobAlerts(email, jobs);

      expect(mailerService.sendMail).toHaveBeenCalledTimes(1);
      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: email,
        subject: 'Vagas Relevantes para Você',
        template: './jobsAlert',
        context: {
          jobs,
        },
      });
    });
  });

  describe('sendMail', () => {
    it('should send generic email with provided parameters', async () => {
      const mailOptions = mailOptionsMock();
      mailerService.sendMail.mockResolvedValue(undefined);

      await service.sendMail(mailOptions);

      expect(mailerService.sendMail).toHaveBeenCalledTimes(1);
      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: mailOptions.email,
        subject: mailOptions.subject,
        template: mailOptions.template,
        context: mailOptions.context,
      });
    });

    it('should return void when email is sent successfully', async () => {
      const mailOptions = mailOptionsMock();
      mailerService.sendMail.mockResolvedValue(undefined);
      const result = await service.sendMail(mailOptions);
      expect(result).toBeUndefined();
    });
  });

  describe('error handling', () => {
    it('should handle mailer service errors in sendUserConfirmation', async () => {
      const user = userMailMock();
      const error = new Error('SMTP connection failed');
      mailerService.sendMail.mockRejectedValue(error);

      await expect(service.sendUserConfirmation(user)).rejects.toThrow(
        'SMTP connection failed',
      );
      expect(mailerService.sendMail).toHaveBeenCalledTimes(1);
    });

    it('should handle mailer service errors in sendUserCreationConfirmation', async () => {
      const user = userMailMock();
      const error = new Error('Invalid email template');
      mailerService.sendMail.mockRejectedValue(error);

      await expect(service.sendUserCreationConfirmation(user)).rejects.toThrow(
        'Invalid email template',
      );
      expect(mailerService.sendMail).toHaveBeenCalledTimes(1);
    });

    it('should handle mailer service errors in sendCompanyConfirmation', async () => {
      const company = companyMailMock();
      const error = new Error('Authentication failed');
      mailerService.sendMail.mockRejectedValue(error);

      await expect(service.sendCompanyConfirmation(company)).rejects.toThrow(
        'Authentication failed',
      );
      expect(mailerService.sendMail).toHaveBeenCalledTimes(1);
    });

    it('should handle mailer service errors in sendCompanyCreationConfirmation', async () => {
      const company = companyMailMock();
      const error = new Error('Template not found');
      mailerService.sendMail.mockRejectedValue(error);

      await expect(
        service.sendCompanyCreationConfirmation(company),
      ).rejects.toThrow('Template not found');
      expect(mailerService.sendMail).toHaveBeenCalledTimes(1);
    });

    it('should handle mailer service errors in sendJobAlerts', async () => {
      const email = 'candidate@example.com';
      const jobs = jobMailListMock();
      const error = new Error('Rate limit exceeded');
      mailerService.sendMail.mockRejectedValue(error);

      await expect(service.sendJobAlerts(email, jobs)).rejects.toThrow(
        'Rate limit exceeded',
      );
      expect(mailerService.sendMail).toHaveBeenCalledTimes(1);
    });

    it('should handle mailer service errors in sendMail', async () => {
      const mailOptions = mailOptionsMock();
      const error = new Error('Invalid recipient email');
      mailerService.sendMail.mockRejectedValue(error);

      await expect(service.sendMail(mailOptions)).rejects.toThrow(
        'Invalid recipient email',
      );
      expect(mailerService.sendMail).toHaveBeenCalledTimes(1);
    });

    it('should handle network timeout errors', async () => {
      const user = userMailMock();
      const error = new Error('Network timeout');
      error.name = 'TimeoutError';
      mailerService.sendMail.mockRejectedValue(error);

      await expect(service.sendUserConfirmation(user)).rejects.toThrow(
        'Network timeout',
      );
      expect(mailerService.sendMail).toHaveBeenCalledTimes(1);
    });
  });
});
