import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import {
  CreateUserService,
  FindOneUserService,
  FindAllUsersService,
  UpdateUserService,
  DeleteUserService,
} from './services';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UserController],
  providers: [
    CreateUserService,
    FindOneUserService,
    FindAllUsersService,
    UpdateUserService,
    DeleteUserService,
  ],
  exports: [UserRepository],
})
export class UserModule {}
