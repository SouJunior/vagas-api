import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { CandidacyService } from '../service/candidacy.service';
import { CreateCandidacyDto } from '../dto/create-candidacy.dto';
import { LoggedUser } from 'src/modules/auth/decorator/logged-user.decorator';
import { UsersEntity } from 'src/database/entities/users.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCandidacyDto } from '../dto/update-candidacy.dto';
import { CandidacyStatus } from 'src/database/entities/candidancy-status.enum';

@Controller('candidacy')
@UseGuards(AuthGuard('jwt'))
export class CandidacyController {
  constructor(private readonly candidacyService: CandidacyService) {}

  @Post()
  async createCandidacy(@Body() createCandidacyDTO: CreateCandidacyDto) {
    return await this.candidacyService.create(createCandidacyDTO);
  }

  @Get()
  async getCandidacies(@LoggedUser() user: UsersEntity) {
    return await this.candidacyService.getCandidacyByUserId(user.id);
  }

  @Patch()
  async updateCandidacy(@Body() updateCandidacyDto: UpdateCandidacyDto) {
    if (updateCandidacyDto.status === CandidacyStatus.InProgress) {
      return {
        message: 'Não é possível atualizar para o status "em andamento"',
      };
    }
    return await this.candidacyService.closeCandidacy(
      updateCandidacyDto.id,
      updateCandidacyDto.status,
    );
  }
}
