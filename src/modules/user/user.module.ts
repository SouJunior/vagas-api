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
import { CompanyRepository } from '../company/repository/company.repository';
import { CurriculumRepository } from '../curriculum/repository/curriculum-repository';
import { UsersEntity } from 'src/database/entities/users.entity';
import { CompaniesEntity } from 'src/database/entities/companies.entity';
import { CurriculumEntity } from 'src/database/entities/curriculum.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, CompaniesEntity, CurriculumEntity]),
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
    UserRepository,
    CompanyRepository,
    CurriculumRepository,
  ],
  exports: [RecoveryPasswordByEmail],
})
export class UserModule {}
