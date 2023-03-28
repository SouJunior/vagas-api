import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { handleError } from '../../../shared/utils/handle-error.util';
import { CompanyRepository } from './../../company/repository/company-repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: { email: string }) {
    let user: any = {};

    user = await this.userRepository
      .findOneByEmail(payload.email)
      .catch(handleError);

    if (!user) {
      user = await this.companyRepository
        .findOneByEmail(payload.email)
        .catch(handleError);
    }

    if (!user) {
      throw new UnauthorizedException('User not found or not authorized!');
    }

    if (user) {
      delete user.password;
      return user;
    }
  }
}
