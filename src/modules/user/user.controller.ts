import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../../database/entities/users.entity';
import { PageOptionsDto } from '../../shared/pagination';
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
  async createNewUser(@Body() data: CreateUserDto) {
    return this.createUserService.execute(data);
  }

  @Get()
  @UseGuards(AuthGuard())
  async getAllUsers(
    @LoggedAdmin() user: UserEntity,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    return this.findAllUsersService.execute(pageOptionsDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getOneUser(@Param('id') id: string, @LoggedUser() user: UserEntity) {
    return this.findOneUserService.execute(+id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
    @LoggedUser() user: UserEntity,
  ) {
    return this.updateUserService.execute(+id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteUser(@Param('id') id: string, @LoggedUser() user: UserEntity) {
    return this.deleteUserService.execute(+id);
  }
}
