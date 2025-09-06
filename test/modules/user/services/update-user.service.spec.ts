import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { UserRepository } from '../../../../src/modules/user/repository/user.repository';
import { UpdateUserService } from '../../../../src/modules/user/services/update-user.service';
import { FileUploadService } from '../../../../src/modules/upload/upload.service';
import { userUpdateMock } from '../../../mocks/user/user-update.mock';
import { TEST_USER_DATA } from '../../../config/test-constants';
import { userMock, userEntityMock } from '../../../mocks/user/user.mock';
import { createUserRepositoryMock } from '../../../shared/repository-mocks';

const createFileUploadServiceMock = (): jest.Mocked<
  Partial<FileUploadService>
> => ({
  upload: jest.fn(),
  deleteFile: jest.fn(),
});

describe('UpdateUserService', () => {
  let service: UpdateUserService;
  let userRepository: jest.Mocked<Partial<UserRepository>>;
  let fileUploadService: jest.Mocked<Partial<FileUploadService>>;

  beforeEach(async () => {
    userRepository = createUserRepositoryMock();
    fileUploadService = createFileUploadServiceMock();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        UpdateUserService,
        {
          provide: UserRepository,
          useValue: userRepository,
        },
        {
          provide: FileUploadService,
          useValue: fileUploadService,
        },
      ],
    }).compile();

    service = module.get(UpdateUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should throw BadRequestException when file is provided but profileKey is missing', async () => {
      const updateUserSpy = jest.spyOn(userRepository, 'updateUser');

      const updateDto = {
        name: 'Test',
        mainPhone: TEST_USER_DATA.MAIN_PHONE,
        phone: TEST_USER_DATA.SECONDARY_PHONE,
        city: 'São Paulo',
        state: 'SP',
      };

      const mockFile = {
        originalname: 'test.jpg',
        buffer: Buffer.from('test'),
      };

      await expect(
        service.execute(userEntityMock() as any, updateDto as any, mockFile),
      ).rejects.toThrow(
        new BadRequestException('profileKey is required when a file is sent'),
      );

      expect(updateUserSpy).not.toHaveBeenCalled();
    });

    it('should be able to update an user with file when profileKey is provided', async () => {
      const fileUploadService = service['fileUploadService'];
      fileUploadService.deleteFile = jest.fn().mockResolvedValue(undefined);
      fileUploadService.upload = jest.fn().mockResolvedValue({
        Location: 'https://s3.bucket.com/file.jpg',
        key: 'uploads/file.jpg',
      });

      userRepository.updateUser = jest.fn().mockResolvedValue(undefined);
      const updateUserSpy = jest.spyOn(userRepository, 'updateUser');
      const deleteFileSpy = jest.spyOn(fileUploadService, 'deleteFile');
      const uploadSpy = jest.spyOn(fileUploadService, 'upload');

      const updateDto = {
        name: 'Test',
        mainPhone: TEST_USER_DATA.MAIN_PHONE,
        phone: TEST_USER_DATA.SECONDARY_PHONE,
        city: 'São Paulo',
        state: 'SP',
        profileKey: 'old-key-to-delete',
      };

      const mockFile = {
        originalname: 'test.jpg',
        buffer: Buffer.from('test'),
      };

      const response = await service.execute(
        userEntityMock() as any,
        updateDto as any,
        mockFile,
      );

      expect(response).toEqual({ message: 'User updated successfully' });
      expect(deleteFileSpy).toHaveBeenCalledWith('old-key-to-delete');
      expect(uploadSpy).toHaveBeenCalledWith(mockFile);
      expect(updateUserSpy).toHaveBeenCalled();
      expect(updateUserSpy).toBeCalledTimes(1);
    });

    it('should be able to update an user', async () => {
      userRepository.updateUser = jest.fn().mockResolvedValue(userMock());
      const updateUserSpy = jest.spyOn(userRepository, 'updateUser');

      const updateDto = {
        name: 'Test',
        mainPhone: TEST_USER_DATA.MAIN_PHONE,
        phone: TEST_USER_DATA.SECONDARY_PHONE,
        city: 'São Paulo',
        state: 'SP',
      };

      const response = await service.execute(
        userEntityMock() as any,
        updateDto as any,
        null,
      );
      expect(response).toEqual({ message: 'User updated successfully' });
      expect(updateUserSpy).toHaveBeenCalled();
      expect(updateUserSpy).toBeCalledTimes(1);
    });
    it('should be able to update an user when data has password ', async () => {
      userRepository.updateUser = jest.fn().mockResolvedValue(userMock());
      const updateUserSpy = jest.spyOn(userRepository, 'updateUser');
      const response = await service.execute(
        userEntityMock() as any,
        userUpdateMock() as any,
        null,
      );
      expect(response).toEqual({ message: 'User updated successfully' });
      expect(updateUserSpy).toHaveBeenCalled();
      expect(updateUserSpy).toBeCalledTimes(1);
    });
  });
});
