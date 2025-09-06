import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { MailService } from '../src/modules/mails/mail.service';
import { UserRepository } from '../src/modules/user/repository/user.repository';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: MailService,
          useValue: {
            sendMail: jest.fn(),
            checkConnection: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            getAllUsers: jest.fn().mockResolvedValue({ data: [] }),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.text).toContain('Sou Junior');
        expect(res.text).toContain('<svg');
        expect(res.text).toContain('linkedin.com/company/soujunior');
      });
  });
});
