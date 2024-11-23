import {
  Controller,
  Get,
  Req,
  Res,
  Patch,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { SwaggerHealthCheck } from './shared/Swagger/decorators/app/health-check.swagger.decorator';
import { Request, Response } from 'express';

@ApiTags('Status')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Show status of operation',
  })
  getAppStatus(@Req() req: Request) {
    const baseUrl = req.protocol + '://' + req.get('host');
    return this.appService.getAppStatus(baseUrl);
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

  @Patch(':applicationId')
  @HttpCode(200)
  async updateStatus(
    @Param('userId') userId: string,
    @Param('applicationId') applicationId: string,
    @Body('status') status: string,
  ) {
    if (!status) {
      throw new BadRequestException('Novo status é obrigatório');
    }

    const application = await this.appService.updateStatus(
      userId,
      applicationId,
      status,
    );

    if (!application) {
      throw new NotFoundException(
        'Candidatura não encontrada ou não pertence ao usuário',
      );
    }

    return { message: 'Status atualizado com sucesso', application };
  }
}
