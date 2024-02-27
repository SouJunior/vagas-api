import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { ApplicationsRepository } from './repository/applications.repository';
import { ApplicationEntity } from 'src/database/entities/applications.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationEntity]),
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsRepository, ApplicationsService],
})
export class ApplicationsModule {}
