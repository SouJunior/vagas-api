import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UploadController } from './upload.controller';
import { FileUploadService } from './upload.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [UploadController],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class UploadModule {}
