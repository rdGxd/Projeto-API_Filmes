import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Movie } from 'src/movie/entities/movie.entity';
import { Repository } from 'typeorm';
import { PayloadDto } from '../../auth/dto/payload.dto';
import { Roles } from '../../common/enums/role.enum';
import { MovieService } from '../../movie/services/movie.service';
import { UserService } from '../../user/services/user.service';
import { CreateFavoriteDto } from '../dto/create-favorite.dto';
import { UpdateFavoriteDto } from '../dto/update-favorite.dto';
import { Favorite } from '../entities/favorite.entity';
import { FavoriteMapper } from '../mapper/favorite-mapper';
import { FavoriteService } from '../services/favorite.service';

describe('FavoriteService', () => {
  let service: FavoriteService;
  let favoriteRepository: Repository<Favorite>;
  let userService: UserService;
  let movieService: MovieService;
  let favoriteMapper: FavoriteMapper;

  const mockUser = {
    id: randomUUID(),
    name: 'Test User',
    email: 'test@example.com',
    password: 'hashedPassword',
    roles: [Roles.User],
    createdAt: new Date(),
    updatedAt: new Date(),
    favorites: [],
    reviews: [],
  };

  const mockMovie = Object.assign(Object.create(Movie.prototype), {
    id: randomUUID(),
    title: 'Test Movie',
    description: 'Test Description',
    genre: 'action',
    yearRelease: 2023,
    coverImage: 'http://example.com/image.jpg',
    rating: 8.5,
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [],
  });

  const mockFavorite: Favorite = {
    id: randomUUID(),
    user: mockUser as any,
    movie: mockMovie as Movie,
    createdAt: new Date(),
    updatedAt: new Date(),
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
        FavoriteService,
        {
          provide: getRepositoryToken(Favorite),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
            merge: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            findById: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: MovieService,
          useValue: {
            findById: jest.fn(),
          },
        },
        {
          provide: FavoriteMapper,
          useValue: {
            toEntity: jest.fn(),
            toDto: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FavoriteService>(FavoriteService);
    favoriteRepository = module.get<Repository<Favorite>>(
      getRepositoryToken(Favorite),
    );
    userService = module.get<UserService>(UserService);
    movieService = module.get<MovieService>(MovieService);
    favoriteMapper = module.get<FavoriteMapper>(FavoriteMapper);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(favoriteRepository).toBeDefined();
    expect(userService).toBeDefined();
    expect(movieService).toBeDefined();
    expect(favoriteMapper).toBeDefined();
  });

  describe('create', () => {
    it('should create a favorite successfully', async () => {
      const createFavoriteDto: CreateFavoriteDto = { movieId: mockMovie.id };

      const favoriteEntity = {
        id: randomUUID().toString(),
        user: mockUser,
        movie: mockMovie,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Favorite;

      const expectedResponse = {
        idFavorite: favoriteEntity.id,
        user: {
          userId: mockUser.id,
          userName: mockUser.name,
        },
        movie: {
          movieId: mockMovie.id,
          movieTitle: mockMovie.title,
        },
        createdAt: favoriteEntity.createdAt,
        updatedAt: favoriteEntity.updatedAt,
      };

      jest.spyOn(movieService, 'findById').mockResolvedValue(mockMovie as Movie);
      jest.spyOn(userService, 'findById').mockResolvedValue(mockUser as any);
      jest.spyOn(favoriteMapper, 'toEntity').mockReturnValue(favoriteEntity);
      jest.spyOn(favoriteRepository, 'save').mockResolvedValue(favoriteEntity);
      jest.spyOn(userService, 'update').mockResolvedValue(mockUser as any);
      jest
        .spyOn(favoriteMapper, 'toDto')
        .mockReturnValue(expectedResponse as any);

      const result = await service.create(createFavoriteDto, mockPayload);

      expect(movieService.findById).toHaveBeenCalledWith(
        createFavoriteDto.movieId,
      );
      expect(userService.findById).toHaveBeenCalledWith(mockPayload.sub);
      expect(favoriteMapper.toEntity).toHaveBeenCalledWith(mockUser, mockMovie);
      expect(favoriteRepository.save).toHaveBeenCalledWith(favoriteEntity);
      expect(userService.update).toHaveBeenCalledWith(
        mockUser.id,
        { ...mockUser, favorites: [favoriteEntity] },
        mockPayload,
      );
      expect(favoriteMapper.toDto).toHaveBeenCalledWith(favoriteEntity);
      expect(result).toEqual(expectedResponse);
    });

    it('should throw error when movie not found', async () => {
      const createFavoriteDto: CreateFavoriteDto = {
        movieId: 'non-existent-movie-id',
      };

      jest.spyOn(movieService, 'findById').mockResolvedValue(null as any);

      await expect(
        service.create(createFavoriteDto, mockPayload),
      ).rejects.toThrow('Movie not found');
    });

    it('should throw error when user not found', async () => {
      const createFavoriteDto: CreateFavoriteDto = {
        movieId: mockMovie.id,
      };

      jest.spyOn(movieService, 'findById').mockResolvedValue(mockMovie );
      jest.spyOn(userService, 'findById').mockResolvedValue(null);

      await expect(
        service.create(createFavoriteDto, mockPayload),
      ).rejects.toThrow('User not found');
    });

    it('should throw error when user is not authorized', async () => {
      const createFavoriteDto: CreateFavoriteDto = {
        movieId: mockMovie.id,
      };

      jest.spyOn(movieService, 'findById').mockResolvedValue(mockMovie );
      jest.spyOn(userService, 'findById').mockResolvedValue(mockUser as any);

      await expect(
        service.create(createFavoriteDto, mockPayload),
      ).rejects.toThrow('User not found');
    });
  });

  describe('findAll', () => {
    it('should return all favorites for a user', async () => {
      const favorites = [mockFavorite];
      const expectedResponse = [
        {
          idFavorite: mockFavorite.id,
          user: {
            userId: mockUser.id,
            userName: mockUser.name,
          },
          movie: {
            movieId: mockMovie.id,
            movieTitle: mockMovie.title,
          },
          createdAt: mockFavorite.createdAt,
          updatedAt: mockFavorite.updatedAt,
        },
      ];

      jest.spyOn(favoriteRepository, 'find').mockResolvedValue(favorites);
      jest
        .spyOn(favoriteMapper, 'toDto')
        .mockReturnValue(expectedResponse[0] as any);

      const result = await service.findAll(mockPayload);

      expect(favoriteRepository.find).toHaveBeenCalledWith({
        where: { user: { id: mockPayload.sub } },
        relations: ['user', 'movie'],
      });
      expect(favoriteMapper.toDto).toHaveBeenCalledTimes(favorites.length);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('findOne', () => {
    it('should return a favorite by id', async () => {
      const expectedResponse = {
        idFavorite: mockFavorite.id,
        user: {
          userId: mockUser.id,
          userName: mockUser.name,
        },
        movie: {
          movieId: mockMovie.id,
          movieTitle: mockMovie.title,
        },
        createdAt: mockFavorite.createdAt,
        updatedAt: mockFavorite.updatedAt,
      };

      jest.spyOn(favoriteRepository, 'findOne').mockResolvedValue(mockFavorite);
      jest
        .spyOn(favoriteMapper, 'toDto')
        .mockReturnValue(expectedResponse as any);

      const result = await service.findOne(mockFavorite.id, mockPayload);

      expect(favoriteRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockFavorite.id, user: { id: mockPayload.sub } },
        relations: ['user', 'movie'],
      });
      expect(favoriteMapper.toDto).toHaveBeenCalledWith(mockFavorite);
      expect(result).toEqual(expectedResponse);
    });

    it('should throw error when favorite not found', async () => {
      jest.spyOn(favoriteRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.findOne('non-existent-id', mockPayload),
      ).rejects.toThrow('Favorite not found');
    });
  });

  describe('update', () => {
    it('should update a favorite successfully', async () => {
      const updateFavoriteDto: UpdateFavoriteDto = {
        // Add any fields that can be updated
      };

      const expectedResponse = {
        idFavorite: mockFavorite.id,
        user: {
          userId: mockUser.id,
          userName: mockUser.name,
        },
        movie: {
          movieId: mockMovie.id,
          movieTitle: mockMovie.title,
        },
        createdAt: mockFavorite.createdAt,
        updatedAt: mockFavorite.updatedAt,
      };

      jest.spyOn(favoriteRepository, 'findOne').mockResolvedValue(mockFavorite);
      jest.spyOn(favoriteRepository, 'merge').mockReturnValue(mockFavorite);
      jest.spyOn(favoriteRepository, 'save').mockResolvedValue(mockFavorite);
      jest
        .spyOn(favoriteMapper, 'toDto')
        .mockReturnValue(expectedResponse as any);

      const result = await service.update(
        mockFavorite.id,
        updateFavoriteDto,
        mockPayload,
      );

      expect(favoriteRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockFavorite.id, user: { id: mockPayload.sub } },
      });
      expect(favoriteRepository.merge).toHaveBeenCalledWith(mockFavorite, {
        ...updateFavoriteDto,
        user: { id: mockPayload.sub },
      });
      expect(favoriteRepository.save).toHaveBeenCalledWith(mockFavorite);
      expect(favoriteMapper.toDto).toHaveBeenCalledWith(mockFavorite);
      expect(result).toEqual(expectedResponse);
    });

    it('should throw error when favorite not found for update', async () => {
      const updateFavoriteDto: UpdateFavoriteDto = {};

      jest.spyOn(favoriteRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.update('non-existent-id', updateFavoriteDto, mockPayload),
      ).rejects.toThrow('Favorite not found');
    });
  });

  describe('remove', () => {
    it('should remove a favorite successfully', async () => {
      const expectedResponse = {
        idFavorite: mockFavorite.id,
        user: {
          userId: mockUser.id,
          userName: mockUser.name,
        },
        movie: {
          movieId: mockMovie.id,
          movieTitle: mockMovie.title,
        },
        createdAt: mockFavorite.createdAt,
        updatedAt: mockFavorite.updatedAt,
      };

      jest.spyOn(favoriteRepository, 'findOne').mockResolvedValue(mockFavorite);
      jest.spyOn(favoriteRepository, 'remove').mockResolvedValue(mockFavorite);
      jest
        .spyOn(favoriteMapper, 'toDto')
        .mockReturnValue(expectedResponse as any);

      const result = await service.remove(mockFavorite.id, mockPayload);

      expect(favoriteRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockFavorite.id, user: { id: mockPayload.sub } },
      });
      expect(favoriteRepository.remove).toHaveBeenCalledWith(mockFavorite);
      expect(favoriteMapper.toDto).toHaveBeenCalledWith(mockFavorite);
      expect(result).toEqual(expectedResponse);
    });

    it('should throw error when favorite not found for removal', async () => {
      jest.spyOn(favoriteRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.remove('non-existent-id', mockPayload),
      ).rejects.toThrow('Favorite not found');
    });
  });
});
