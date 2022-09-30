import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/database/entities/users.entity';
import { LoggedUser } from './decorator/logged-user.decorator';
import { UserLoginDto } from './dtos/user-login.dto';
import { AuthLoginService } from './services/auth-login.service';

@Controller('auth')
export class AuthController {
  constructor(private authLoginService: AuthLoginService) {}

  @Post('/login')
  async login(@Body() data: UserLoginDto) {
    return this.authLoginService.execute(data);
  }

  @Get('/user-logged')
  @UseGuards(AuthGuard())
  async userLogged(@LoggedUser() user: UserEntity) {
    return user;
  }
}
