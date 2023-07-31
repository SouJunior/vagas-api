import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UsersEntity } from '../../database/entities/users.entity';
import { BadRequestSwagger } from '../../shared/Swagger/bad-request.swagger';
import { UnauthorizedSwagger } from '../../shared/Swagger/unauthorized.swagger';
import { PageOptionsDto } from '../../shared/pagination';
import { LoggedAdmin } from '../auth/decorator/logged-admin.decorator';
import { LoggedUser } from '../auth/decorator/logged-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { EmailDto } from './dtos/email-user.dto';
import { CreatePasswordHashDto } from './dtos/update-my-password.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { NotFoundSwagger } from '../../shared/Swagger/not-found.swagger';
import { UnprocessableEntitySwagger } from '../../shared/Swagger/unprocessable-entity.swagger';
import { CreateResponseSwagger } from '../../shared/Swagger/user/create-response.swagger';
import { ListResponseSwagger } from '../../shared/Swagger/user/list-response.swagger';
import { RecoveryPasswordSwagger } from '../../shared/Swagger/user/recovery-password.swagger';
import { GetByParamsDto } from './dtos/get-by-params.dto';
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
    private activateUserService: ActivateUserService,
  ) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Exemplo do retorno de sucesso da rota',
    type: CreateResponseSwagger,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Modelo de erro',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Modelo de erro',
    type: BadRequestSwagger,
  })
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Exemplo do retorno de sucesso da rota',
    type: CreateResponseSwagger,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Modelo de erro',
    type: UnprocessableEntitySwagger,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Modelo de erro',
    type: BadRequestSwagger,
  })
  @ApiOperation({
    summary: 'Ativar um usuário pelo ID',
  })
  async activateUser(@Param('id') id: string) {
    return this.activateUserService.execute(id);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Exemplo do retorno de sucesso da rota',
    type: ListResponseSwagger,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Modelo de erro',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Modelo de erro',
    type: BadRequestSwagger,
  })
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Exemplo do retorno de sucesso da rota',
    type: CreateResponseSwagger,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Modelo de erro',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Modelo de erro',
    type: BadRequestSwagger,
  })
  @ApiOperation({
    summary: 'Visualizar um usuário pelo ID (precisa ser adm)',
  })
  @ApiParam({
    type: GetByParamsDto,
    name: '',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async getOneUser(@LoggedUser() user: UsersEntity) {
    return this.findOneUserService.execute(user);
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file'))
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Exemplo do retorno de sucesso da rota',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Modelo de erro',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Modelo de erro',
    type: BadRequestSwagger,
  })
  @ApiOperation({
    summary: 'Atualizar um usuário pelo ID',
  })
  async updateUser(
    @LoggedUser() user: UsersEntity,
    @Body() data: UpdateUserDto,
    @UploadedFile('file') file,
  ) {
    return this.updateUserService.execute(user, data, file);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Exemplo do retorno de sucesso da rota',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Modelo de erro',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Modelo de erro',
    type: BadRequestSwagger,
  })
  @ApiOperation({
    summary: 'Deletar um usuário pelo ID',
  })
  @ApiParam({
    type: GetByParamsDto,
    name: '',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async deleteUser(@LoggedUser() user: UsersEntity) {
    return this.deleteUserService.execute(user);
  }

  @Patch('recovery_password')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Exemplo do retorno de sucesso da rota',
    type: RecoveryPasswordSwagger,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Modelo de erro',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Modelo de erro',
    type: BadRequestSwagger,
  })
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Exemplo do retorno de sucesso da rota',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Modelo de erro',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Modelo de erro',
    type: BadRequestSwagger,
  })
  @ApiOperation({
    summary: 'User update password.',
  })
  async updatePassword(
    @Body() updatePassword: CreatePasswordHashDto,
    @Res() res: Response,
  ) {
    const { data, status } = await this.updatePasswordByEmailService.execute(
      updatePassword,
    );

    return res.status(status).send(data);
  }
}
