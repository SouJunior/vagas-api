import { BadRequestException, Injectable } from '@nestjs/common';
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
      throw new BadRequestException(
        'profileKey is required when a file is sent',
      );
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

    await this.userRepository.updateUser(user, data);

    return { message: 'User updated successfully' };
  }
}
