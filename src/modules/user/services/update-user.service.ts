import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from '../../../database/entities/users.entity';
import { FileUploadService } from '../../upload/upload.service';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UpdateUserService {
  constructor(
    private userRepository: UserRepository,
    private fileUploadService: FileUploadService,
  ) {}

  async execute(user: UsersEntity, data: UpdateUserDto, file) {
    if (file && !data.profileKey) {
      return {
        status: 400,
        data: {
          message: 'profileKey is required when file is send',
        },
      };
    }

    if (file) {
      await this.fileUploadService.deleteFile(data?.profileKey);
      const { Location, key } = await this.fileUploadService.upload(file);
      data.profile = Location;
      data.profileKey = key;
    }

    delete data?.file;

    if (data?.password) {
      data.password = await bcrypt.hash(data?.password, 10);
    }

    await this.userRepository.updateUser(user.id, data);

    return { message: 'User updated successfully' };
  }
}
