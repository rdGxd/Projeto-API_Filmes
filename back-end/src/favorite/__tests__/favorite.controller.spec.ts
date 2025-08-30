import { Test, TestingModule } from '@nestjs/testing';
import { PayloadDto } from '../../auth/dto/payload.dto';
import { Roles } from '../../common/enums/role.enum';
import { FavoriteController } from '../controllers/favorite.controller';
import { CreateFavoriteDto } from '../dto/create-favorite.dto';
import { UpdateFavoriteDto } from '../dto/update-favorite.dto';
import { FavoriteService } from '../services/favorite.service';

describe('FavoriteController', () => {
  let controller: FavoriteController;
  let favoriteService: any;

  const mockPayload: PayloadDto = {
    sub: '123e4567-e89b-12d3-a456-426614174000',
    email: 'test@example.com',
    roles: [Roles.User],
    iat: 1234567890,
    exp: 1234567890,
    aud: 'test',
    iss: 'test',
  };

  beforeEach(async () => {
    const mockFavoriteService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteController],
      providers: [
        {
          provide: FavoriteService,
          useValue: mockFavoriteService,
        },
      ],
    }).compile();

    controller = module.get<FavoriteController>(FavoriteController);
    favoriteService = module.get<FavoriteService>(FavoriteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(favoriteService).toBeDefined();
  });

  describe('create', () => {
    it('should call favoriteService.create with correct parameters', async () => {
      const createFavoriteDto: CreateFavoriteDto = {
        userId: mockPayload.sub,
        movieId: '123e4567-e89b-12d3-a456-426614174001',
      };
      const mockResponse = { id: '1', ...createFavoriteDto };

      favoriteService.create.mockResolvedValue(mockResponse);

      const result = await controller.create(createFavoriteDto, mockPayload);

      expect(favoriteService.create).toHaveBeenCalledWith(
        createFavoriteDto,
        mockPayload,
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findAll', () => {
    it('should call favoriteService.findAll with correct parameters', async () => {
      const mockResponse = [
        { id: '1', userId: mockPayload.sub, movieId: '123' },
      ];

      favoriteService.findAll.mockResolvedValue(mockResponse);

      const result = await controller.findAll(mockPayload);

      expect(favoriteService.findAll).toHaveBeenCalledWith(mockPayload);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findOne', () => {
    it('should call favoriteService.findOne with correct parameters', async () => {
      const favoriteId = '123e4567-e89b-12d3-a456-426614174002';
      const mockResponse = { id: favoriteId, userId: mockPayload.sub };

      favoriteService.findOne.mockResolvedValue(mockResponse);

      const result = await controller.findOne(favoriteId, mockPayload);

      expect(favoriteService.findOne).toHaveBeenCalledWith(
        favoriteId,
        mockPayload,
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('update', () => {
    it('should call favoriteService.update with correct parameters', async () => {
      const favoriteId = '123e4567-e89b-12d3-a456-426614174002';
      const updateFavoriteDto: UpdateFavoriteDto = {};
      const mockResponse = { id: favoriteId, ...updateFavoriteDto };

      favoriteService.update.mockResolvedValue(mockResponse);

      const result = await controller.update(
        favoriteId,
        updateFavoriteDto,
        mockPayload,
      );

      expect(favoriteService.update).toHaveBeenCalledWith(
        favoriteId,
        updateFavoriteDto,
        mockPayload,
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('remove', () => {
    it('should call favoriteService.remove with correct parameters', async () => {
      const favoriteId = '123e4567-e89b-12d3-a456-426614174002';
      const mockResponse = { id: favoriteId, deleted: true };

      favoriteService.remove.mockResolvedValue(mockResponse);

      const result = await controller.remove(favoriteId, mockPayload);

      expect(favoriteService.remove).toHaveBeenCalledWith(
        favoriteId,
        mockPayload,
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
