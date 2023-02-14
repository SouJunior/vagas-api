import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../../../database/entities/users.entity';
import { PageDto, PageOptionsDto } from '../../../shared/pagination';

import { UserRepository } from '../repository/user.repository';

@Injectable()
export class FindAllUsersService {
  constructor(private userRepository: UserRepository) {}

  async execute(pageOptionsDto: PageOptionsDto): Promise<PageDto<UsersEntity>> {
    const query = await this.userRepository.getAllUsers(pageOptionsDto);

    return query;
  }
}
