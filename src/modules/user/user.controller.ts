import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import {
  CreateUserService,
  FindOneUserService,
  FindAllUsersService,
  UpdateUserService,
  DeleteUserService,
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
  async getAllJobs() {
    return this.findAllUsersService.execute();
  }

  @Get(':id')
  async getOneJob(@Param('id') id: string) {
    return this.findOneUserService.execute(+id);
  }

  @Put(':id')
  async updateJob(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.updateUserService.execute(+id, data);
  }

  @Delete(':id')
  async deleteJob(@Param('id') id: string) {
    return this.deleteUserService.execute(+id);
  }
}
