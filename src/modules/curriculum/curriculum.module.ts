import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadService } from '../upload/upload.service';
import { CurriculumController } from './curriculum.controller';
import { CurriculumService } from './curriculum.service';
import { CurriculumRepository } from './repository/curriculum-repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CurriculumRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [CurriculumController],
  providers: [CurriculumService, FileUploadService],
})
export class CurriculumModule {}
