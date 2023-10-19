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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { SwaggerCreateUser } from 'src/shared/Swagger/decorators/user/create-user.swagger.decorator';
import { SwaggerDeleteUser } from 'src/shared/Swagger/decorators/user/delete-user.swagger.decorator';
import { SwaggerGetUserAdm } from 'src/shared/Swagger/decorators/user/get-user-adm.swagger.decorator';
import { SwaggerGetUser } from 'src/shared/Swagger/decorators/user/get-user.swagger.decorator';
import { SwaggerRecoverEmail } from 'src/shared/Swagger/decorators/user/recover-by-email.swagger.decorator';
import { SwaggerUpdatePassAfterRecovery } from 'src/shared/Swagger/decorators/user/update-pass-after-email-recovery.swagger.decorator';
import { SwaggerUpdatePassword } from 'src/shared/Swagger/decorators/user/update-password.swagger.decorator';
import { SwaggerUpdateUser } from 'src/shared/Swagger/decorators/user/update-user.swagger.decorator';
import { SwaggerFindUsers } from 'src/shared/Swagger/decorators/user/view-users.swagger.decorator';
import { UsersEntity } from '../../database/entities/users.entity';
import { PageOptionsDto } from '../../shared/pagination';
import { LoggedAdmin } from '../auth/decorator/logged-admin.decorator';
import { LoggedUser } from '../auth/decorator/logged-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { EmailDto } from './dtos/email-user.dto';
import {
  CreatePasswordHashDto,
  UpdateMyPasswordDto,
} from './dtos/update-my-password.dto';
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
import { UpdatePasswordService } from './services/update-password.service';

@ApiTags('User')
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
    private updatePasswordService: UpdatePasswordService,
    private activateUserService: ActivateUserService,
  ) {}

  @Post()
  @SwaggerCreateUser()
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
  @SwaggerGetUser()
  async activateUser(@Param('id') id: string) {
    return this.activateUserService.execute(id);
  }

  @Get()
  @SwaggerFindUsers()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async getAllUsers(
    @LoggedAdmin() user: UsersEntity,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    return this.findAllUsersService.execute(pageOptionsDto);
  }

  @Get(':id')
  @SwaggerGetUserAdm()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async getOneUser(@Param('id') id: string, @LoggedUser() user: UsersEntity) {
    return this.findOneUserService.execute(id);
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file'))
  @SwaggerUpdateUser()
  async updateUser(
    @LoggedUser() user: UsersEntity,
    @Body() data: UpdateUserDto,
    @UploadedFile('file') file,
  ) {
    return this.updateUserService.execute(user, data, file);
  }

  @Delete(':id')
  @SwaggerDeleteUser()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async deleteUser(@Param('id') id: string, @LoggedUser() user: UsersEntity) {
    return this.deleteUserService.execute(id);
  }

  @Patch('recovery_password')
  @SwaggerRecoverEmail()
  async recoveryPasswordSendEmail(
    @Body() { email }: EmailDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.recoveryPasswordByEmail.execute(email);

    return res.status(status).send(data);
  }

  @Patch('update_password_email')
  @SwaggerUpdatePassAfterRecovery()
  async updatePasswordAfterEmail(
    @Body() updatePassword: CreatePasswordHashDto,
    @Res() res: Response,
  ) {
    const { data, status } = await this.updatePasswordByEmailService.execute(
      updatePassword,
    );
    return res.status(status).send(data);
  }

  @Patch('update_password')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @SwaggerUpdatePassword()
  async updatePassword(
    @LoggedUser() user: UsersEntity,
    @Body() passData: UpdateMyPasswordDto,
    @Res() res: Response,
  ) {
    const { data, status } = await this.updatePasswordService.execute(
      user,
      passData,
    );

    return res.status(status).send(data);
  }
}
