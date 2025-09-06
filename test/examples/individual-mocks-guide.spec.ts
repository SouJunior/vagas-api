import { UserRepository } from '../../src/modules/user/repository/user.repository';
import { userMock } from '../mocks/user/user.mock';

describe('ExampleService - Individual Mocks Pattern', () => {
  let userRepository: jest.Mocked<Partial<UserRepository>>;

  const createUserRepositoryMock = (): jest.Mocked<
    Partial<UserRepository>
  > => ({
    findOneById: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    findOneByEmail: jest.fn(),
  });

  beforeEach(async () => {
    userRepository = createUserRepositoryMock();
  });

  describe('findUser example', () => {
    it('should find user successfully', async () => {
      const mockUser = userMock();
      userRepository.findOneByEmail!.mockResolvedValue(mockUser as any);

      await expect(
        userRepository.findOneByEmail!('test@test.com'),
      ).resolves.toEqual(mockUser);
      expect(userRepository.findOneByEmail).toHaveBeenCalledWith(
        'test@test.com',
      );
      expect(userRepository.findOneByEmail).toHaveBeenCalledTimes(1);
    });

    it('should handle user not found', async () => {
      userRepository.findOneByEmail!.mockResolvedValue(null);

      const result = await userRepository.findOneByEmail!(
        'nonexistent@test.com',
      );

      expect(result).toBeNull();
      expect(userRepository.findOneByEmail).toHaveBeenCalledWith(
        'nonexistent@test.com',
      );
    });
  });

  describe('createUser example', () => {
    it('should create user when email is unique', async () => {
      const newUserData = { name: 'New User', email: 'new@test.com' };
      const createdUser = { id: '456', ...newUserData };

      userRepository.findOneByEmail!.mockResolvedValue(null);
      userRepository.createUser!.mockResolvedValue(createdUser as any);

      const emailCheck = await userRepository.findOneByEmail!('new@test.com');
      const result = await userRepository.createUser!(newUserData as any);

      expect(emailCheck).toBeNull();
      expect(result).toEqual(createdUser);
      expect(userRepository.findOneByEmail).toHaveBeenCalledWith(
        'new@test.com',
      );
      expect(userRepository.createUser).toHaveBeenCalledWith(newUserData);
    });

    it('should handle when email already exists', async () => {
      const existingUser = userMock();

      userRepository.findOneByEmail!.mockResolvedValue(existingUser as any);

      const emailCheck =
        await userRepository.findOneByEmail!('existing@test.com');

      expect(emailCheck).toEqual(existingUser);
      expect(userRepository.findOneByEmail).toHaveBeenCalledWith(
        'existing@test.com',
      );
      expect(userRepository.createUser).not.toHaveBeenCalled();
    });
  });
});
