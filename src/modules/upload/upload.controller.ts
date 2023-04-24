import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { FileUploadService } from './upload.service';

@ApiTags('Upload')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('upload')
export class UploadController {
  constructor(private fileUploadService: FileUploadService) {}

  @ApiProperty()
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
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file) {
    const response = await this.fileUploadService.upload(file);

    if (response.Location) {
      return response.Location;
    }

    return response;
  }
}
