import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApplicationHistoryService } from '../service/applicationHistory.service';

@Controller('users')
export class ApplicationHistoryController {
  constructor(private readonly applicationHistoryService: ApplicationHistoryService) {}

  @Get(':userId/applications/history')
  async getApplicationHistory(
    @Param('userId') userId: string,
    @Query('status') status?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<any[]> {
    return this.applicationHistoryService.getApplicationHistory(userId, status, page, limit);
  }
}
