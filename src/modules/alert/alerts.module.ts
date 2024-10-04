import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertsController } from './controller/alerts.controller';
import { AlertEntity } from 'src/database/entities/alert.entity';
import { MailModule } from '../mails/mail.module';
import { AlertsRepository } from './repository/alerts.repository';
import { AlertsService } from './service/alerts.service';

@Module({
  imports: [TypeOrmModule.forFeature([AlertEntity]), MailModule],
  controllers: [AlertsController],
  providers: [AlertsService, AlertsRepository],
  exports: [AlertsService],
})
export class AlertsModule {}
