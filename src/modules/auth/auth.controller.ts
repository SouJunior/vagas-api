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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../../database/entities/users.entity';
import { LoggedUser } from './decorator/logged-user.decorator';
import { UserLoginDto } from './dtos/user-login.dto';
import { AuthLoginService } from './services/auth-login.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authLoginService: AuthLoginService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Faz login utilizando o token',
  })
  async login(@Body() data: UserLoginDto) {
    return this.authLoginService.execute(data);
  }

  @Get('/user-logged')
  @UseGuards(AuthGuard()) //nest has a AuthGuard that checks the authorization, this makes the guard available for the route.
  @ApiOperation({
    summary: 'Retorna usuário logado',
  })
  @ApiBearerAuth()
  async userLogged(@LoggedUser() user: UserEntity) {
    return user;
  }
}
