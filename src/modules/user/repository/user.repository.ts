import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UsersEntity } from '../../../database/entities/users.entity';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '../../../shared/pagination';
import { handleError } from '../../../shared/utils/handle-error.util';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateMyPasswordDto } from '../dtos/update-my-password.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@EntityRepository(UsersEntity)
export class UserRepository extends Repository<UsersEntity> {
  async createUser(data: CreateUserDto): Promise<UsersEntity> {
    const newUser = this.create(data);
    return this.update(newUser.id, data)
      .then(() => newUser)
      .catch(handleError);
  }

  async getAllUsers(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<UsersEntity>> {
    const queryBuilder = this.createQueryBuilder('users');

    queryBuilder
      .orderBy(`users.${pageOptionsDto.orderByColumn}`, pageOptionsDto.order)
      .select([
        'users.id',
        'users.name',
        'users.email',
        'users.created_at',
        'users.cpf',
      ])
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount().catch(handleError);
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async searchUserByName(name: string): Promise<UsersEntity[]> {
    return this.find({ where: { name } }).catch(handleError);
  }

  async findOneById(id: string): Promise<UsersEntity> {
    return this.findOne(id).catch(handleError);
  }

  async findOneByEmail(email: string): Promise<UsersEntity> {
    return this.findOne({ where: { email } }).catch(handleError);
  }

  async findOneByCpf(cpf: string): Promise<UsersEntity> {
    return this.findOne({ cpf }).catch(handleError);
  }

  async updateUser(id: string, data: UpdateUserDto) {
    await this.update(id, data).catch(handleError);

    return this.findOne(id).catch(handleError);
  }

  async deleteUserById(id: string): Promise<object> {
    await this.delete(id).catch(handleError);

    return { message: 'User deleted successfully' };
  }

  async updateMyPassword(updateMyPasswordDto: UpdateMyPasswordDto, id) {
    const user = await this.findOne(id).catch(handleError);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.update(id, updateMyPasswordDto)
      .then(() => {
        return this.findOne(id);
      })
      .catch(handleError);
  }

  async updateRecoveryPassword(id, recoverPasswordToken) {
    const user = await this.findOne(id).catch(handleError);

    user.recoverPasswordToken = recoverPasswordToken;

    return this.update(id, user);
  }

  async activateUser(id) {
    const user = await this.findOne(id).catch(handleError);

    user.mailconfirm = true;

    return this.update(id, user);
  }

  async findByToken(recoverPasswordToken: string): Promise<UsersEntity> {
    return this.findOne({ where: { recoverPasswordToken } }).catch(handleError);
  }

  async updatePassword(id, password: string): Promise<UsersEntity> {
    const user = await this.findOne(id).catch(handleError);
    const data = {
      recoverPasswordToken: null,
      password,
    };

    delete user.password;

    await this.update(id, {
      ...user,
      ...data,
    }).catch(handleError);

    return this.findOne(id).catch(handleError);
  }
}
