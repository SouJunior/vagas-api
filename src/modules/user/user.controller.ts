import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/database/entities/users.entity';
import { LoggedAdmin } from '../auth/decorator/logged-admin.decorator';

import { LoggedUser } from '../auth/decorator/logged-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import {
  CreateUserService,
  DeleteUserService,
  FindAllUsersService,
  FindOneUserService,
  UpdateUserService,
} from './services';

@Controller('user')
export class UserController {
  constructor(
    private createUserService: CreateUserService,
    private findOneUserService: FindOneUserService,
    private findAllUsersService: FindAllUsersService,
    private updateUserService: UpdateUserService,
    private deleteUserService: DeleteUserService,
  ) {}

  @Post()
  async createNewJob(@Body() data: CreateUserDto) {
    return this.createUserService.execute(data);
  }

  @Get()
  @UseGuards(AuthGuard())
  async getAllJobs(@LoggedAdmin() user: UserEntity) {
    return this.findAllUsersService.execute();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getOneJob(@Param('id') id: string, @LoggedUser() user: UserEntity) {
    return this.findOneUserService.execute(+id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateJob(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
    @LoggedUser() user: UserEntity,
  ) {
    return this.updateUserService.execute(+id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteJob(@Param('id') id: string, @LoggedUser() user: UserEntity) {
    return this.deleteUserService.execute(+id);
  }
}
