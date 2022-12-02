import { UserEntity } from '../../../database/entities/users.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import {
  PageOptionsDto,
  PageDto,
  PageMetaDto,
} from '../../../shared/pagination';
import { handleError } from '../../../shared/utils/handle-error.util';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(data: CreateUserDto): Promise<CreateUserDto> {
    return this.save(data);
  }

  async getAllUsers(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<UserEntity>> {
    const queryBuilder = this.createQueryBuilder('users');

    queryBuilder
      .orderBy(`users.${pageOptionsDto.orderByColumn}`, pageOptionsDto.order)
      .select(['users.id', 'users.name', 'users.email', 'users.created_at'])
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount().catch(handleError);
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async searchUserByName(name: string): Promise<UserEntity[]> {
    return this.find({ where: { name } }).catch(handleError);
  }

  async findOneById(id: number): Promise<UserEntity> {
    return this.findOne(id).catch(handleError);
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return this.findOne({ email }).catch(handleError);
  }

  async updateUser(id: number, data: UpdateUserDto) {
    await this.update(id, data).catch(handleError);

    return this.findOne(id).catch(handleError);
  }

  async deleteUserById(id: number): Promise<object> {
    await this.delete(id).catch(handleError);

    return { message: 'User deleted successfully' };
  }
}
