import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CandidacyService } from '../service/candidacy.service';
import { CreateCandidacyDto } from '../dto/create-candidacy.dto';
import { LoggedUser } from 'src/modules/auth/decorator/logged-user.decorator';
import { UsersEntity } from 'src/database/entities/users.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCandidacyDto } from '../dto/update-candidacy.dto';
import { CandidacyStatus } from 'src/database/entities/candidancy-status.enum';
import { ApiTags } from '@nestjs/swagger';
import { CreateCandidacySwagger } from 'src/shared/Swagger/decorators/candidacy/create-candidacy.swagger';
import { GetCandidaciesSwagger } from 'src/shared/Swagger/decorators/candidacy/get-candidacies.swagger';
import { UpdateCandidacySwagger } from 'src/shared/Swagger/decorators/candidacy/update-candidacy.swagger';

@ApiTags('Candidacy')
@Controller('candidacy')
@UseGuards(AuthGuard('jwt'))
export class CandidacyController {
  constructor(private readonly candidacyService: CandidacyService) {}

  @Post()
  @CreateCandidacySwagger()
  async createCandidacy(@Body() createCandidacyDTO: CreateCandidacyDto) {
    return await this.candidacyService.create(createCandidacyDTO);
  }

  @Get()
  @GetCandidaciesSwagger()
  async getCandidacies(@LoggedUser() user: UsersEntity) {
    return await this.candidacyService.getCandidacyByUserId(user.id);
  }

  @Patch()
  @UpdateCandidacySwagger()
  async updateCandidacy(@Body() updateCandidacyDto: UpdateCandidacyDto) {
    if (updateCandidacyDto.status === CandidacyStatus.InProgress) {
      throw new BadRequestException(
        'Não é possível atualizar para o status "em andamento"',
      );
    }
    return await this.candidacyService.closeCandidacy(
      updateCandidacyDto.id,
      updateCandidacyDto.status,
    );
  }
}
