import { UserEntity } from '../../../database/entities/users.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { PageOptionsDto, PageDto, PageMetaDto } from 'src/shared/pagination';

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

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async searchUserByName(name: string): Promise<UserEntity[]> {
    return this.find({ where: { name } });
  }

  async findOneById(id: number): Promise<UserEntity> {
    return this.findOne(id);
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return this.findOne({ email });
  }

  async updateUser(id: number, data: UpdateUserDto) {
    const user = await this.findOne(id);

    return this.save({
      ...user,
      ...data,
    });
  }

  async deleteUserById(id: number): Promise<object> {
    await this.delete(id);

    return { message: 'User deleted successfully' };
  }
}
