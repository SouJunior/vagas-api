import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AlertsService } from '../service/alerts.service';
import { CreateAlertDto } from '../dtos/create-alert.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Alerts')
@Controller('alerts')
@UseGuards(AuthGuard('jwt'))
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post()
  @ApiBearerAuth()
  async createAlert(@Body() createAlertDto: CreateAlertDto) {
    return await this.alertsService.createAlert(createAlertDto);
  }
}
