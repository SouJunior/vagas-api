import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthLoginService } from './services/auth-login.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthLoginService],
})
export class AuthModule {}
