import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadService } from '../upload/upload.service';
import { CurriculumController } from './curriculum.controller';
import { CurriculumService } from './curriculum.service';
import { CurriculumRepository } from './repository/curriculum-repository';
import { UserRepository } from '../user/repository/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CurriculumRepository, UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [CurriculumController],
  providers: [CurriculumService, FileUploadService],
})
export class CurriculumModule {}
