import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SavedJobsService } from '../savedjobs/services/savedjobs.service';
import { SavedJobsEntity } from '../../database/entities/savedjobs.entity';
import { CreateSavedJobDto } from '../savedjobs/dtos/create-savedJob-dto';
import { AuthGuard } from '@nestjs/passport';
import { SwaggerFindSavedJobs } from 'src/shared/Swagger/decorators/savedjobs/view-savedjobs.swagger.decorator';
import { SwaggerCreateSavedJobs } from 'src/shared/Swagger/decorators/savedjobs/create-savedjobs.swagger.decorator';
import { GetAllSavedJobsDto } from './dtos/get-all-savedjobs.dto';
import { PageOptionsDto } from 'src/shared/pagination';
import { FindAllSavedJobsService } from './services/find-all-savedjobs.service';
import { log } from 'console';


@ApiTags('saved-jobs')
@Controller('saved-jobs')
export class SavedJobsController {
  constructor(
    private readonly savedJobsService: SavedJobsService,
    private readonly findAllSavedJobsService: FindAllSavedJobsService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard()) 
  @SwaggerCreateSavedJobs()
  @ApiOperation({ summary: 'Salvar vaga para um usuário' })
  async saveJob(
    @Body() createSavedJobDto: CreateSavedJobDto,
  ): Promise<SavedJobsEntity> {
    try {
      console.log(createSavedJobDto);
      
      return await this.savedJobsService.saveJob(createSavedJobDto);
    } catch (error) {
      throw new HttpException(
        'Erro ao salvar vaga',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @SwaggerFindSavedJobs()
  @ApiOperation({ summary: 'Obtenha todos os trabalhos salvos com filtros e paginação.' })
  async getAllSavedJobs(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() query: GetAllSavedJobsDto,
  ) {
    try {
      return await this.findAllSavedJobsService.execute(pageOptionsDto, query);
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar vagas salvas',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
