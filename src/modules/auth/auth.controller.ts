import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { UsersEntity } from '../../database/entities/users.entity';
import { BadRequestSwagger } from '../../shared/Swagger/bad-request.swagger';
import { UnauthorizedSwagger } from '../../shared/Swagger/unauthorized.swagger';
import { LoggedUser } from './decorator/logged-user.decorator';
import { UserLoginResponseDto } from './dtos/user-login-response.dto';
import { UserLoginDto } from './dtos/user-login.dto';
import { AuthLoginService } from './services/auth-login.service';
import { LoggerUserType } from './types/logged-user.types';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authLoginService: AuthLoginService) {}

  @Post('/login')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Exemplo do retorno de sucesso da rota',
    type: UserLoginResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Modelo de erro',
    type: BadRequestSwagger,
  })
  @ApiOperation({
    summary: 'Rota para fazer login na plataforma',
  })
  async login(@Body() loginData: UserLoginDto, @Res() res: Response) {
    const { status, data } = await this.authLoginService.execute(loginData);

    return res.status(status).send(data);
  }

  @Get('/user-logged')
  @UseGuards(AuthGuard())
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Exemplo do retorno de sucesso da rota',
    type: LoggerUserType,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Modelo de erro',
    type: UnauthorizedSwagger,
  })
  @ApiOperation({
    summary: 'Retorna usuário logado',
  })
  @ApiBearerAuth()
  async userLogged(@LoggedUser() user: UsersEntity) {
    return user;
  }
}
