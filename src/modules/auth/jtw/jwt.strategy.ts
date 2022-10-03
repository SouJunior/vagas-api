import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { handleError } from 'src/shared/utils/handle-error.util';
import { UserRepository } from '../../../modules/user/repository/user.repository';

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
