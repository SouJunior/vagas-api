import * as bcrypt from 'bcrypt';
import { CreatePasswordHashDto } from 'src/modules/user/dtos/update-my-password.dto';
import { CompanyRepository } from '../repository/company-repository';

export class UpdatePasswordByEmailService {
  async execute({
    recoverPasswordToken,
    password,
    confirmPassword,
  }: CreatePasswordHashDto) {
    const companyRepository = new CompanyRepository();

    const user = await companyRepository.findByToken(recoverPasswordToken);

    if (!user) {
      return {
        status: 400,
        data: { message: 'User not found' },
      };
    }

    if (password != confirmPassword) {
      return {
        status: 400,
        data: { message: 'Password mismatch' },
      };
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const userUpdated = await companyRepository.updatePassword(
      user.id,
      passwordHash,
    );

    return {
      status: 200,
      data: userUpdated,
    };
  }
}
