import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { SavedJobsService } from '../savedjobs/services/savedjobs.service';
import { CreateSavedJobDto } from '../savedjobs/dtos/create-savedJob-dto';
import { AuthGuard } from '@nestjs/passport';
import { SwaggerFindSavedJobs } from 'src/shared/Swagger/decorators/savedjobs/view-savedjobs.swagger.decorator';
import { SwaggerCreateSavedJobs } from 'src/shared/Swagger/decorators/savedjobs/create-savedjobs.swagger.decorator';
import { GetAllSavedJobsDto } from './dtos/get-all-savedjobs.dto';
import { PageOptionsDto } from 'src/shared/pagination';
import { FindAllSavedJobsService } from './services/find-all-savedjobs.service';

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
  @UsePipes(new ValidationPipe())  
  @SwaggerCreateSavedJobs()
  @ApiOperation({ summary: 'Salvar vaga para um usuário' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Vaga salva com sucesso',
    schema: {
      example: {
        message: 'Sua vaga foi salva com sucesso!',
        statusCode: HttpStatus.CREATED,
        savedJob: { /* exemplo do objeto salvo */ },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro ao salvar vaga',
  })
  async saveJob(
    @Body() createSavedJobDto: CreateSavedJobDto,
  ): Promise<any> {
    try {
      const savedJob = await this.savedJobsService.saveJob(createSavedJobDto);
      return {
        message: 'Sua vaga foi salva com sucesso!',
        statusCode: HttpStatus.CREATED,
        savedJob: savedJob,
      };
    } catch (error) {
      throw new HttpException(
        `Erro ao salvar vaga: ${error.message || 'erro desconhecido'}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @SwaggerFindSavedJobs()
  @ApiOperation({ summary: 'Obtenha todos os trabalhos salvos com filtros e paginação.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de trabalhos salvos',
    schema: {
      example: {
        items: [/* exemplo de lista de jobs */],
        total: 10,
        page: 1,
        pageSize: 10,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro ao buscar vagas salvas',
  })
  async getAllSavedJobs(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() query: GetAllSavedJobsDto,
  ) {
    try {
      const savedJobs = await this.findAllSavedJobsService.getAllSavedJobs(pageOptionsDto, query);
      return savedJobs;
    } catch (error) {
      throw new HttpException(
        `Erro ao buscar vagas salvas: ${error.message || 'erro desconhecido'}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
