import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { Roles } from 'src/common/enums/role.enum';
import { HashingProtocol } from 'src/common/hashing/hashing-protocol';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UserMapper } from '../mapper/user-mapper';
import { UserService } from '../services/user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;
  let hashingService: HashingProtocol;
  let userMapper: UserMapper;

  const mockUser: User = {
    id: randomUUID(),
    name: 'Test User',
    email: 'test@example.com',
    password: 'hashedPassword',
    createdAt: new Date(),
    updatedAt: new Date(),
    roles: [Roles.User],
    favorites: [],
    reviews: [],
  };

  const mockPayload: PayloadDto = {
    sub: mockUser.id,
    email: mockUser.email,
    roles: [Roles.User],
    iat: 1234567890,
    exp: 1234567890,
    aud: 'test',
    iss: 'test',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: HashingProtocol,
          useValue: { hash: jest.fn(), compare: jest.fn() },
        },
        {
          provide: UserMapper,
          useValue: { toEntity: jest.fn(), toResponse: jest.fn() },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
            merge: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    hashingService = module.get<HashingProtocol>(HashingProtocol);
    userMapper = module.get<UserMapper>(UserMapper);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(hashingService).toBeDefined();
    expect(userMapper).toBeDefined();
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      const userDto: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      };

      const userEntity = {
        email: userDto.email,
        name: userDto.name,
        password: userDto.password,
      } as User;

      const expectedSaveParam = {
        email: userDto.email,
        name: userDto.name,
        password: 'hashedPassword',
      };

      jest.spyOn(userMapper, 'toEntity').mockReturnValue(userEntity);
      jest.spyOn(hashingService, 'hash').mockResolvedValue('hashedPassword');
      jest.spyOn(userRepository, 'save').mockResolvedValue(mockUser);
      jest.spyOn(userMapper, 'toResponse').mockReturnValue({
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
      } as any);

      const result = await userService.create(userDto);

      expect(userMapper.toEntity).toHaveBeenCalledWith(userDto);
      expect(hashingService.hash).toHaveBeenCalledWith(userDto.password);
      expect(userRepository.save).toHaveBeenCalledWith(expectedSaveParam);
      expect(userMapper.toResponse).toHaveBeenCalledWith(mockUser);
      expect(result).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [mockUser];
      const mappedUsers = [
        {
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
        },
      ];

      jest.spyOn(userRepository, 'find').mockResolvedValue(users);
      jest
        .spyOn(userMapper, 'toResponse')
        .mockReturnValue(mappedUsers[0] as any);

      const result = await userService.findAll();

      expect(userRepository.find).toHaveBeenCalledWith({
        relations: ['favorites', 'reviews'],
      });
      expect(userMapper.toResponse).toHaveBeenCalledTimes(users.length);
      expect(result).toEqual(mappedUsers);
    });
  });

  describe('findOne', () => {
    it('should return a user by id when user exists and is authorized', async () => {
      const mappedUser = {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(userMapper, 'toResponse').mockReturnValue(mappedUser as any);

      const result = await userService.findOne(mockUser.id, mockPayload);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        relations: ['favorites', 'reviews'],
      });
      expect(userMapper.toResponse).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mappedUser);
    });

    it('should throw error when user not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(
        userService.findOne('non-existent-id', mockPayload),
      ).rejects.toThrow('User not found');
    });

    it('should throw error when user is not authorized', async () => {
      const unauthorizedPayload: PayloadDto = {
        sub: 'different-user-id',
        email: 'different@example.com',
        roles: [Roles.User],
        iat: 1234567890,
        exp: 1234567890,
        aud: 'test',
        iss: 'test',
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);

      await expect(
        userService.findOne(mockUser.id, unauthorizedPayload),
      ).rejects.toThrow('Unauthorized');
    });
  });

  describe('update', () => {
    it('should update a user successfully', async () => {
      const updateDto: UpdateUserDto = {
        name: 'Updated Name',
      };

      const updatedUser = { ...mockUser, name: 'Updated Name' };
      const mappedResponse = {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      };

      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(mockUser)
        .mockResolvedValueOnce(updatedUser);
      jest
        .spyOn(userRepository, 'merge')
        .mockImplementation((target, source) => {
          Object.assign(target, source);
          return target;
        });
      jest.spyOn(userRepository, 'save').mockResolvedValue(updatedUser);
      jest
        .spyOn(userMapper, 'toResponse')
        .mockReturnValue(mappedResponse as any);

      const result = await userService.update(
        mockUser.id,
        updateDto,
        mockPayload,
      );

      expect(userRepository.findOne).toHaveBeenCalledTimes(2);
      expect(userRepository.merge).toHaveBeenCalledWith(mockUser, updateDto);
      expect(userRepository.save).toHaveBeenCalled();
      expect(userMapper.toResponse).toHaveBeenCalledWith(updatedUser);
      expect(result).toEqual(mappedResponse);
    });

    it('should throw error when user not found for update', async () => {
      const updateDto: UpdateUserDto = { name: 'Updated Name' };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(
        userService.update('non-existent-id', updateDto, mockPayload),
      ).rejects.toThrow('User not found');
    });

    it('should throw error when user is not authorized for update', async () => {
      const updateDto: UpdateUserDto = { name: 'Updated Name' };
      const unauthorizedPayload: PayloadDto = {
        sub: 'different-user-id',
        email: 'different@example.com',
        roles: [Roles.User],
        iat: 1234567890,
        exp: 1234567890,
        aud: 'test',
        iss: 'test',
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);

      await expect(
        userService.update(mockUser.id, updateDto, unauthorizedPayload),
      ).rejects.toThrow('Unauthorized');
    });
  });

  describe('remove', () => {
    it('should remove a user successfully', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser);
      jest.spyOn(userRepository, 'remove').mockResolvedValue(mockUser);

      const result = await userService.remove(mockUser.id, mockPayload);

      expect(userRepository.findOneBy).toHaveBeenCalledWith({
        id: mockUser.id,
      });
      expect(userRepository.remove).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });

    it('should throw error when user not found for removal', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      await expect(
        userService.remove('non-existent-id', mockPayload),
      ).rejects.toThrow('User not found');
    });

    it('should throw error when user is not authorized for removal', async () => {
      const unauthorizedPayload: PayloadDto = {
        sub: 'different-user-id',
        email: 'different@example.com',
        roles: [Roles.User],
        iat: 1234567890,
        exp: 1234567890,
        aud: 'test',
        iss: 'test',
      };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser);

      await expect(
        userService.remove(mockUser.id, unauthorizedPayload),
      ).rejects.toThrow('Unauthorized');
    });
  });

  describe('findByEmail', () => {
    it('should return user by email', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser);

      const result = await userService.findByEmail(mockUser.email);

      expect(userRepository.findOneBy).toHaveBeenCalledWith({
        email: mockUser.email,
      });
      expect(result).toEqual(mockUser);
    });

    it('should return null when user not found by email', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      const result = await userService.findByEmail('non-existent@example.com');

      expect(result).toBeNull();
    });
  });

  describe('findById', () => {
    it('should return user by id', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser);

      const result = await userService.findById(mockUser.id);

      expect(userRepository.findOneBy).toHaveBeenCalledWith({
        id: mockUser.id,
      });
      expect(result).toEqual(mockUser);
    });

    it('should return null when user not found by id', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      const result = await userService.findById('non-existent-id');

      expect(result).toBeNull();
    });
  });
});
