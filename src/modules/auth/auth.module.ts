import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRepository } from '../company/repository/company-repository';
import { UserRepository } from '../user/repository/user.repository';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jtw/jwt.strategy';
import { AuthLoginService } from './services/auth-login.service';
import { UsersEntity } from 'src/database/entities/users.entity';
import { CompaniesEntity } from 'src/database/entities/companies.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([UsersEntity, CompaniesEntity]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [UserRepository, CompanyRepository, AuthLoginService, JwtStrategy],
})
export class AuthModule {}
