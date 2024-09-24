import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AlertsService } from '../service/alerts.service';
import { CreateAlertDto } from '../dtos/create-alert.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('alerts')
@UseGuards(AuthGuard('jwt'))
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post()
  async createAlert(@Body() createAlertDto: CreateAlertDto) {
    return await this.alertsService.createAlert(createAlertDto);
  }
}
