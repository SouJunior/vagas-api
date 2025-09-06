import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRepository } from '../company/repository/company.repository';
import { UserRepository } from '../user/repository/user.repository';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthLoginService } from './services/auth-login.service';
import { UsersEntity } from 'src/database/entities/users.entity';
import { CompaniesEntity } from 'src/database/entities/companies.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([UsersEntity, CompaniesEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '24h',
          algorithm: 'HS256',
          issuer: 'vagas-api',
          audience: 'vagas-api-users',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [UserRepository, CompanyRepository, AuthLoginService, JwtStrategy],
})
export class AuthModule {}
