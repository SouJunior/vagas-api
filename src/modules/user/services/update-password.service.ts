import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/modules/mails/mail.service';
import { UpdateMyPasswordDto } from '../dtos/update-my-password.dto';
import { UserRepository } from '../repository/user.repository';
import { UsersEntity } from 'src/database/entities/users.entity';

@Injectable()
export class UpdatePasswordService {
  constructor(
    private userRepository: UserRepository,
    private mailService: MailService,
  ) {}

  async execute(
    user: UsersEntity,
    { oldPassword, password, confirmNewPassword }: UpdateMyPasswordDto,
  ) {
    const userExists = await this.userRepository.findOneById(user.id);

    if (!userExists) {
      return {
        status: 400,
        data: { message: 'usuário não encontrado ou não autenticado.' },
      };
    }

    const isOldPassCorrect = await bcrypt.compare(
      oldPassword,
      userExists.password,
    );

    if (!isOldPassCorrect) {
      return {
        status: 400,
        data: { message: 'A senha atual está incorreta.' },
      };
    }

    if (password != confirmNewPassword) {
      return {
        status: 400,
        data: { message: 'As senhas não conferem!' },
      };
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const userUpdated = await this.userRepository.updatePassword(
      user.id,
      passwordHash,
    );

    await this.mailService.sendUserConfirmation(userUpdated);

    return {
      status: 200,
      data: { message: 'Senha redefinida com sucesso!' },
    };
  }
}
