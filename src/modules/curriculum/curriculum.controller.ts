import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CurriculumEntity } from '../../database/entities/curriculum.entity';
import { UsersEntity } from '../../database/entities/users.entity';
import { LoggedAdmin } from '../auth/decorator/logged-admin.decorator';
import { CurriculumService } from './curriculum.service';
import { DeleteCurriculumDto } from './dtos/delete-curriculum.dto';

@ApiTags('Curriculum')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('curriculum')
export class CurriculumController {
  constructor(private curriculumService: CurriculumService) {}

  @Get()
  async getAllCurriculum(
    @LoggedAdmin() user: UsersEntity,
  ): Promise<CurriculumEntity[]> {
    return this.curriculumService.getALlCurriculum(user);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload images',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCurriculum(
    @LoggedAdmin() user: UsersEntity,
    @UploadedFile() file,
  ) {
    return this.curriculumService.uploadCurriculum(file, user);
  }

  @Delete(':key')
  async deleteCurriculum(@Param() { key }: DeleteCurriculumDto) {
    return this.curriculumService.deleteCurriculum(key);
  }
}
