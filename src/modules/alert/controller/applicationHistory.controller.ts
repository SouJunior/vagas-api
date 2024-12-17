import { Controller, Get, Param, Query, ValidationPipe, Logger } from '@nestjs/common';
import { ApplicationHistoryService } from '../service/applicationHistory.service';
import { ApplicationHistoryDto } from '../dtos/application-history.dto';
import { UserIdParamDto } from '../dtos/user-param-dto';
import { ApplicationHistoryQueryDto } from '../dtos/application-history-query-dto';

@Controller('users')
export class ApplicationHistoryController {
  private readonly logger = new Logger(ApplicationHistoryController.name);

  constructor(private readonly applicationHistoryService: ApplicationHistoryService) {}

  @Get(':userId/applications/history')
  async getApplicationHistory(
    @Param(new ValidationPipe({ transform: true })) params: UserIdParamDto,
    @Query(new ValidationPipe({ transform: true })) query: ApplicationHistoryQueryDto,
  ): Promise<ApplicationHistoryDto[]> {
    const { userId } = params;
    const { status, page = 1, limit = 10 } = query;

    this.logger.log(`Fetching application history for userId: ${userId}`);
    return this.applicationHistoryService.getApplicationHistory(userId, status, page, limit);
  }
}
