import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SavedJobsService } from '../services/saved-jobs.service';
import { CreateSavedJobDto } from '../dtos/create-saved-job.dto';
import { UpdateSavedJobDto } from '../dtos/update-saved-job.dto';

@Controller('saved-jobs')
export class SavedJobsController {
  constructor(private readonly savedJobsService: SavedJobsService) {}

  @Post()
  create(@Body() createSavedJobDto: CreateSavedJobDto) {
    return this.savedJobsService.create(createSavedJobDto);
  }

  @Get()
  findAll() {
    return this.savedJobsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.savedJobsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSavedJobDto: UpdateSavedJobDto) {
    return this.savedJobsService.update(+id, updateSavedJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.savedJobsService.remove(+id);
  }
}
