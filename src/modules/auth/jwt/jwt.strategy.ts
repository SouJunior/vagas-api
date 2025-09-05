import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../../user/repository/user.repository';
import { CompanyRepository } from '../../company/repository/company.repository';
import {
  mapUserToPrincipal,
  mapCompanyToPrincipal,
} from '../utils/principal.mapper';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly configService: ConfigService,
  ) {
    const jwtSecret = configService.getOrThrow<string>('JWT_SECRET');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
      algorithms: ['HS256'],
      issuer: 'vagas-api',
      audience: 'vagas-api-users',
    });
  }

  async validate(payload: { sub: string; email: string; type: string }) {
    if (!payload || !payload.email || !payload.sub) {
      throw new UnauthorizedException('Invalid payload or email');
    }

    try {
      const user = await this.userRepository.findOneByEmail(payload.email);

      if (user) {
        return mapUserToPrincipal(user);
      }

      const company = await this.companyRepository.findOneByEmail(
        payload.email,
      );

      if (company) {
        return mapCompanyToPrincipal(company);
      }

      throw new UnauthorizedException('User not found or not authorized!');
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw error;
    }
  }
}
