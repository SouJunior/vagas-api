import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
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
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
  findOne(user_id: string) {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectRepository(UsersEntity) private usersRepository: Repository<UsersEntity>) {}

  async createUser(data: CreateUserDto): Promise<UsersEntity> {
    return this.usersRepository.save(data).catch(handleError);
  }

  async getAllUsers(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<UsersEntity>> {
    const queryBuilder = this.usersRepository.createQueryBuilder('users');

    queryBuilder
      .orderBy(`users.${pageOptionsDto.orderByColumn}`, pageOptionsDto.order)
      .select(['users.id', 'users.name', 'users.email', 'users.created_at'])
      .skip((pageOptionsDto.page - 1) * pageOptionsDto.take)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount().catch(handleError);
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async searchUserByName(name: string): Promise<UsersEntity[]> {
    return this.usersRepository.find({ select: { name: true } }).catch(handleError);
  }

  async findOneById(id: string): Promise<UsersEntity> {
    return this.usersRepository.findOneBy({id}).catch(handleError);
  }

  async findOneByEmail(email: string): Promise<UsersEntity> {
    return this.usersRepository.findOneBy({ email }).catch(
      handleError,
    );
  }

  async updateUser(user: UsersEntity, data: UpdateUserDto) {
    const bodyToUpdate = {
      ...user,
      ...data,
    };
    await this.usersRepository.save(bodyToUpdate).catch(handleError);

    return;
  }

  async deleteUserById(id: string) {
    await this.usersRepository.delete(id).catch(handleError);

    return;
  }

  async updateMyPassword(updateMyPasswordDto: UpdateMyPasswordDto, id) {
    const user = await this.usersRepository.findOneBy({id}).catch(handleError);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.usersRepository.update(id, updateMyPasswordDto)
      .then(() => {
        return this.usersRepository.findOneBy({id});
      })
      .catch(handleError);
  }

  async updateRecoveryPassword(id: string, recoverPasswordToken: string) {
    const user = await this.usersRepository.findOneBy({id}).catch(handleError);

    user.recoverPasswordToken = recoverPasswordToken;

    await this.usersRepository.update(id, user).catch(handleError);
    return user;
  }

  async activateUser(id: string): Promise<UsersEntity> {
    const user = await this.usersRepository.findOneBy({id}).catch(handleError);

    user.mailConfirm = true;

    await this.usersRepository.update(id, { mailConfirm: true }).catch(handleError);

    return this.usersRepository.findOneBy({id});
  }

  async findByToken(recoverPasswordToken: string): Promise<UsersEntity> {
    return this.usersRepository.findOneBy({ recoverPasswordToken}).catch(handleError);
  }

  async updatePassword(id, password: string): Promise<UsersEntity> {
    const user = await this.usersRepository.findOneBy({id}).catch(handleError);
    const data = {
      recoverPasswordToken: null,
      password,
    };

    delete user.password;

    await this.usersRepository.update(id, {
      ...user,
      ...data,
    }).catch(handleError);

    return this.usersRepository.findOneBy({id}).catch(handleError);
  }
}
