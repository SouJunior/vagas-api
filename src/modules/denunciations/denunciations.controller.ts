import { Body, Controller, Post } from '@nestjs/common';
import { CreateDenunciationDto } from './dtos/create-denunciation.dto';

@Controller('denunciation')
export class DenunciationsController {
  @Post('/create')
  async create(@Body() data: CreateDenunciationDto) {
    return data;
  }
}
