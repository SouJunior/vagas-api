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
    if (!payload || !payload.sub || !payload.email || !payload.type) {
      throw new UnauthorizedException(
        'Invalid payload: missing required fields',
      );
    }

    if (typeof payload.sub !== 'string') {
      throw new UnauthorizedException('Invalid payload: sub must be a string');
    }
    if (typeof payload.email !== 'string') {
      throw new UnauthorizedException(
        'Invalid payload: email must be a string',
      );
    }
    if (typeof payload.type !== 'string') {
      throw new UnauthorizedException('Invalid payload: type must be a string');
    }

    const normalizedSub = payload.sub.trim();
    const normalizedEmail = payload.email.trim();
    const normalizedType = payload.type.trim();

    if (
      normalizedSub === '' ||
      normalizedEmail === '' ||
      normalizedType === ''
    ) {
      throw new UnauthorizedException('Invalid payload: empty required fields');
    }

    try {
      if (normalizedType === 'USER') {
        const user = await this.userRepository.findOneById(normalizedSub);

        if (!user) {
          throw new UnauthorizedException('User not found');
        }

        if (user.email !== normalizedEmail) {
          throw new UnauthorizedException('Email mismatch');
        }

        return mapUserToPrincipal(user);
      } else if (normalizedType === 'COMPANY') {
        const company = await this.companyRepository.findOneById(normalizedSub);

        if (!company) {
          throw new UnauthorizedException('Company not found');
        }

        if (company.email !== normalizedEmail) {
          throw new UnauthorizedException('Email mismatch');
        }

        return mapCompanyToPrincipal(company);
      } else {
        throw new UnauthorizedException('Invalid payload type');
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
