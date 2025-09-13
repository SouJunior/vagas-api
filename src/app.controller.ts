import { Controller, Get, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { SwaggerHealthCheck } from './shared/Swagger/decorators/app/health-check.swagger.decorator';

import { Response } from 'express';

@ApiTags('Status')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Show status of operation',
  })
  getAppStatus() {
    return this.appService.getAppStatus();
  }

  @Get('/health-check')
  @SwaggerHealthCheck()
  @ApiOperation({
    summary: 'Retorna status dos serviços de email e banco de dados',
  })
  async getHealthCheck(@Res() res: Response) {
    const { status, data } = await this.appService.getHealthCheck();
    return res.status(status).send(data);
  }
}
