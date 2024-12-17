import {
  Controller,
  Get,
  Req,
  Res,
  Patch,
  Param,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AppService } from './app.service';
import { SwaggerHealthCheck } from './shared/Swagger/decorators/app/health-check.swagger.decorator';
import { Request, Response } from 'express';
import { UpdateStatusDto } from './modules/applications/dtos/update-status.dto';
import { CustomBadRequestException } from './modules/applications/exceptions/bad-request.exception';
import { CustomNotFoundException } from './modules/applications/exceptions/not-found.exception';

@ApiTags('Status')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Status of operation returned successfully.',
  })
  getAppStatus(@Req() req: Request) {
    const baseUrl = req.protocol + '://' + req.get('host');
    const status = this.appService.getAppStatus(baseUrl);
    return { status: 'success', data: status };
  }

  @Get('/health-check')
  @SwaggerHealthCheck()
  @ApiResponse({
    status: 200,
    description:
      'Health check status of email and database services returned successfully.',
  })
  async getHealthCheck(@Res() res: Response) {
    const { status, data } = await this.appService.getHealthCheck();
    return res.status(status).send({ status: 'success', data });
  }

  @Patch(':userId/:applicationId')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiParam({ name: 'userId', required: true, description: 'ID do usuário' })
  @ApiParam({
    name: 'applicationId',
    required: true,
    description: 'ID da aplicação',
  })
  @ApiBody({ type: UpdateStatusDto })
  @ApiResponse({
    status: 200,
    description: 'Status atualizado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Novo status é obrigatório.',
  })
  @ApiResponse({
    status: 404,
    description: 'Candidatura não encontrada ou não pertence ao usuário.',
  })
  async updateStatus(
    @Param() params: UpdateStatusDto,
    @Body() body: UpdateStatusDto,
  ) {
    const { userId, applicationId, status } = { ...params, ...body };

    if (!status) {
      throw new CustomBadRequestException('Novo status é obrigatório');
    }

    const application = await this.appService.updateStatus(
      userId,
      applicationId,
      status,
    );

    if (!application) {
      throw new CustomNotFoundException(
        'Candidatura não encontrada ou não pertence ao usuário',
      );
    }

    return {
      status: 'success',
      data: { message: 'Status atualizado com sucesso', application },
    };
  }
}
