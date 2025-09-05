import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginSwagger } from 'src/shared/Swagger/decorators/auth/login.swagger';
import { UserLoggedSwagger } from 'src/shared/Swagger/decorators/auth/user-logged.swagger';
import { UsersEntity } from '../../database/entities/users.entity';
import { LoggedUser } from './decorator/logged-user.decorator';
import { UserLoginDto } from './dtos/user-login.dto';
import { AuthLoginService } from './services/auth-login.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authLoginService: AuthLoginService) {}

  @Post('/login')
  @LoginSwagger()
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginData: UserLoginDto) {
    return this.authLoginService.execute(loginData);
  }

  @Get('/user-logged')
  @UseGuards(AuthGuard('jwt'))
  @UserLoggedSwagger()
  @ApiBearerAuth()
  async userLogged(@LoggedUser() user: UsersEntity) {
    return user;
  }
}
