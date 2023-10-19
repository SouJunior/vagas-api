import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from '../mails/mail.module';
import { UserRepository } from './repository/user.repository';
import {
  CreateUserService,
  DeleteUserService,
  FindAllUsersService,
  FindOneUserService,
  RecoveryPasswordByEmail,
  UpdatePasswordByEmailService,
  UpdateUserService,
} from './services';
import { ActivateUserService } from './services/activate-user.service';
import { UserController } from './user.controller';
import { UploadModule } from '../upload/upload.module';
import { UpdatePasswordService } from './services/update-password.service';
import { CompanyRepository } from '../company/repository/company-repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, CompanyRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MailModule,
    UploadModule,
  ],
  controllers: [UserController],
  providers: [
    CreateUserService,
    FindOneUserService,
    FindAllUsersService,
    UpdateUserService,
    DeleteUserService,
    RecoveryPasswordByEmail,
    UpdatePasswordByEmailService,
    UpdatePasswordService,
    ActivateUserService,
  ],
  exports: [RecoveryPasswordByEmail],
})
export class UserModule {}
