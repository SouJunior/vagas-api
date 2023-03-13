import * as bcrypt from 'bcrypt';
import { CompanyRepository } from './../../company/repository/company-repository';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../../modules/user/repository/user.repository';
import { UserLoginDto } from '../dtos/user-login.dto';
import { LoginTypeEnum } from '../enums/login-type.enum';

@Injectable()
export class AuthLoginService {
  constructor(
    private userRepository: UserRepository,
    private companyRepository: CompanyRepository,
    private jwt: JwtService,
  ) {}

  async execute({ email, password, type }: UserLoginDto) {
    let info: any;

    if (type == LoginTypeEnum.COMPANY) {
      info = await this.companyRepository.findOneByEmail(email);
    } else {
      info = await this.userRepository.findOneByEmail(email);
    }

    if (!info) {
      throw new UnauthorizedException('E-mail ou Senha não conferem');
    }

    const passwordIsValid = await bcrypt.compare(password, info.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('E-mail ou Senha não conferem');
    }

    delete info.password;

    return {
      token: this.jwt.sign({ email }),
      info,
    };
  }
}
