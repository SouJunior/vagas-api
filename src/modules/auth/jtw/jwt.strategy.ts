import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { handleError } from '../../../shared/utils/handle-error.util';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: { email: string }) {
    const user = await this.userRepository
      .findOneByEmail(payload.email)
      .catch(handleError);

    if (!user) {
      throw new UnauthorizedException('User not found or not authorized!');
    }

    if (user) {
      delete user.password;
      return user;
    }
  }
}
