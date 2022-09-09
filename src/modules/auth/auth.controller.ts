import { Body, Controller, Post } from '@nestjs/common';
import { UserLoginDto } from './dtos/user-login.dto';
import { AuthLoginService } from './services/auth-login.service';

@Controller('auth')
export class AuthController {
  constructor(private authLoginService: AuthLoginService) {}

  @Post('/login')
  async login(@Body() data: UserLoginDto) {
    return this.authLoginService.execute(data);
  }
}
