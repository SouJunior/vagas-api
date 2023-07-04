import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { ApplicationsRepository } from './repository/applications.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationsRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}
