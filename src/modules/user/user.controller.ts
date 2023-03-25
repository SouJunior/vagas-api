import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UsersEntity } from '../../database/entities/users.entity';
import { PageOptionsDto } from '../../shared/pagination';
import { LoggedAdmin } from '../auth/decorator/logged-admin.decorator';
import { LoggedUser } from '../auth/decorator/logged-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { EmailDto } from './dtos/email-user.dto';
import { CreatePasswordHashDto } from './dtos/update-my-password.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

import {
  CreateUserService,
  DeleteUserService,
  FindAllUsersService,
  FindOneUserService,
  RecoveryPasswordByEmail,
  UpdatePasswordByEmailService,
  UpdateUserService,
} from './services';
import { ActivateUserService } from './services/activate-user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private createUserService: CreateUserService,
    private findOneUserService: FindOneUserService,
    private findAllUsersService: FindAllUsersService,
    private updateUserService: UpdateUserService,
    private deleteUserService: DeleteUserService,
    private recoveryPasswordByEmail: RecoveryPasswordByEmail,
    private updatePasswordByEmailService: UpdatePasswordByEmailService,
    private activateUserService: ActivateUserService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um usuário!',
  })
  async createNewUser(
    @Body() createUser: CreateUserDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const { data, status } = await this.createUserService.execute(
      createUser,
      req,
    );

    return res.status(status).send(data);
  }

  @Put('activate/:id')
  @ApiOperation({
    summary: 'Ativar um usuário pelo ID',
  })
  async activateUser(@Param('id') id: string) {
    return this.activateUserService.execute(id);
  }

  @Get()
  @ApiOperation({
    summary: 'Visualizar todos os usuários',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async getAllUsers(
    @LoggedAdmin() user: UsersEntity,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    return this.findAllUsersService.execute(pageOptionsDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um usuário pelo ID (precisa ser adm)',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async getOneUser(@LoggedUser() user: UsersEntity) {
    return this.findOneUserService.execute(user);
  }

  @Put()
  @ApiOperation({
    summary: 'Atualizar um usuário pelo ID',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async updateUser(
    @Body() data: UpdateUserDto,
    @LoggedUser() user: UsersEntity,
  ) {
    return this.updateUserService.execute(user, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar um usuário pelo ID',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async deleteUser(@LoggedUser() user: UsersEntity) {
    return this.deleteUserService.execute(user);
  }

  @Patch('recovery-password')
  @ApiOperation({
    summary: 'Send email to recovery password.',
  })
  async recoveryPasswordSendEmail(
    @Body() { email }: EmailDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.recoveryPasswordByEmail.execute(email);

    return res.status(status).send(data);
  }

  @Patch('update_password')
  @ApiOperation({
    summary: 'User update password.',
  })
  updatePassword(@Body() updatePassword: CreatePasswordHashDto) {
    return this.updatePasswordByEmailService.execute(updatePassword);
  }
}
