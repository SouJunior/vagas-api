import { Module } from '@nestjs/common';
import { DenunciationsController } from './denunciations.controller';

@Module({
  controllers: [DenunciationsController]
})
export class DenunciationsModule {}
