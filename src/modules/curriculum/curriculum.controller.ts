import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UploadCurriculumSwagger } from 'src/shared/Swagger/curriculum/upload-curriculum.swagger';
import { UsersEntity } from '../../database/entities/users.entity';
import { LoggedUser } from '../auth/decorator/logged-user.decorator';
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
    @LoggedUser() user: UsersEntity,
    @Res() res: Response,
  ) {
    const { data, status } = await this.curriculumService.getALlCurriculum(
      user,
    );

    return res.status(status).send(data);
  }

  @UploadCurriculumSwagger()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCurriculum(
    @LoggedUser() user: UsersEntity,
    @UploadedFile() file,
    @Res() res: Response,
  ) {
    const { data, status } = await this.curriculumService.uploadCurriculum(
      file,
      user,
    );

    return res.status(status).send(data);
  }

  @Delete(':key')
  async deleteCurriculum(@Param() { key }: DeleteCurriculumDto) {
    return this.curriculumService.deleteCurriculum(key);
  }
}
