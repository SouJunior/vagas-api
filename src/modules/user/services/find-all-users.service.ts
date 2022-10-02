import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/users.entity';
import { PageDto, PageOptionsDto } from 'src/shared/pagination';

import { UserRepository } from '../repository/user.repository';

@Injectable()
export class FindAllUsersService {
  constructor(private userRepository: UserRepository) {}

  async execute(pageOptionsDto: PageOptionsDto): Promise<PageDto<UserEntity>> {
    const query = await this.userRepository.getAllUsers(pageOptionsDto);

    return query;
  }
}
