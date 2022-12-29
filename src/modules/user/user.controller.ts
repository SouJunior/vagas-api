import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
  Res,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserEntity } from '../../database/entities/users.entity';
import { PageOptionsDto } from '../../shared/pagination';
import { LoggedAdmin } from '../auth/decorator/logged-admin.decorator';
import { LoggedUser } from '../auth/decorator/logged-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { EmailUserDto } from './dtos/email-user.dto';
import {
  CreateUserService,
  DeleteUserService,
  FindAllUsersService,
  FindOneUserService,
  UpdateUserService,
  RecoveryPasswordByEmail,
  UpdatePasswordByEmailService,
} from './services';
import { CreatePasswordHashDto } from './dtos/update-my-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

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
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um usuário!',
  })
  async createNewUser(@Body() data: CreateUserDto) {
    return this.createUserService.execute(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Visualizar todos os usuários pelo ID',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async getAllUsers(
    @LoggedAdmin() user: UserEntity,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    return this.findAllUsersService.execute(pageOptionsDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um usuário pelo ID',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async getOneUser(@Param('id') id: string, @LoggedUser() user: UserEntity) {
    return this.findOneUserService.execute(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar um usuário pelo ID',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
    @LoggedUser() user: UserEntity,
  ) {
    return this.updateUserService.execute(id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar um usuário pelo ID',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async deleteUser(@Param('id') id: string, @LoggedUser() user: UserEntity) {
    return this.deleteUserService.execute(id);
  }

  @Patch('recovery-password')
  @ApiOperation({
    summary: 'Enviar e-mail para recuperar senha para e-mail',
  })
  async recoveryPasswordSendEmail(
    @Body() { email }: EmailUserDto, // @Res() res: Response,
  ) {
    // const { status, data } = await this.recoveryPasswordByEmail.execute(email);

    // return res.status(status).send(data);
    return this.recoveryPasswordByEmail.execute(email);
  }

  @Patch('update_password')
  @ApiOperation({
    summary: 'Resetar senha utilizando do token',
  })
  updatePassword(@Body() updatePassword: CreatePasswordHashDto) {
    return this.updatePasswordByEmailService.execute(updatePassword);
  }
}
