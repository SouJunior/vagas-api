import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadService } from '../upload/upload.service';
import { CurriculumController } from './curriculum.controller';
import { CurriculumService } from './curriculum.service';
import { CurriculumRepository } from './repository/curriculum-repository';
import { UserRepository } from '../user/repository/user.repository';
import { CurriculumEntity } from 'src/database/entities/curriculum.entity';
import { UsersEntity } from 'src/database/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CurriculumEntity, UsersEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [CurriculumController],
  providers: [
    CurriculumService,
    FileUploadService,
    CurriculumRepository,
    UserRepository,
  ],
})
export class CurriculumModule {}
