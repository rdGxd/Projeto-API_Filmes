import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { PayloadDto } from '../../auth/dto/payload.dto';
import { Roles } from '../../common/enums/role.enum';
import { MovieService } from '../../movie/services/movie.service';
import { UserService } from '../../user/services/user.service';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { Review } from '../entities/review.entity';
import { ReviewMapper } from '../mapper/review-mapper';
import { ReviewService } from '../services/review.service';

describe('ReviewService', () => {
  let service: ReviewService;
  let reviewRepository: Repository<Review>;
  let userService: UserService;
  let movieService: MovieService;
  let reviewMapper: ReviewMapper;

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

  const mockMovie = {
    id: randomUUID(),
    title: 'Test Movie',
    description: 'Test Description',
    genre: 'action',
    yearRelease: 2023,
    rating: 8.5,
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [],
  };

  const mockReview: Review = {
    id: randomUUID(),
    rating: 9,
    comment: 'Great movie!',
    user: mockUser as any,
    movie: mockMovie as any,
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
        ReviewService,
        {
          provide: getRepositoryToken(Review),
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
            update: jest.fn(),
          },
        },
        {
          provide: ReviewMapper,
          useValue: {
            toEntity: jest.fn(),
            toDto: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
    reviewRepository = module.get<Repository<Review>>(
      getRepositoryToken(Review),
    );
    userService = module.get<UserService>(UserService);
    movieService = module.get<MovieService>(MovieService);
    reviewMapper = module.get<ReviewMapper>(ReviewMapper);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(reviewRepository).toBeDefined();
    expect(userService).toBeDefined();
    expect(movieService).toBeDefined();
    expect(reviewMapper).toBeDefined();
  });

  describe('create', () => {
    it('should create a review successfully', async () => {
      const createReviewDto: CreateReviewDto = {
        userId: mockUser.id,
        movieId: mockMovie.id,
        rating: 9,
        comment: 'Great movie!',
      };

      const reviewEntity = {
        id: randomUUID(),
        rating: 9,
        comment: 'Great movie!',
        user: { id: mockUser.id },
        movie: { id: mockMovie.id },
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Review;

      const expectedResponse = {
        id: reviewEntity.id,
        rating: 9,
        comment: 'Great movie!',
        movie: {
          id: mockMovie.id,
          title: mockMovie.title,
          description: mockMovie.description,
          rating: mockMovie.rating,
          genre: mockMovie.genre,
          yearRelease: mockMovie.yearRelease,
          createdAt: mockMovie.createdAt,
          updatedAt: mockMovie.updatedAt,
        },
        user: {
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
          createdAt: mockUser.createdAt,
          updatedAt: mockUser.updatedAt,
        },
        createdAt: reviewEntity.createdAt,
        updatedAt: reviewEntity.updatedAt,
      };

      jest.spyOn(userService, 'findById').mockResolvedValue(mockUser as any);
      jest.spyOn(movieService, 'findById').mockResolvedValue(mockMovie as any);
      jest.spyOn(reviewMapper, 'toEntity').mockReturnValue(reviewEntity);
      jest.spyOn(userService, 'update').mockResolvedValue(mockUser as any);
      jest.spyOn(movieService, 'update').mockResolvedValue(mockMovie as any);
      jest.spyOn(reviewRepository, 'save').mockResolvedValue(reviewEntity);
      jest
        .spyOn(reviewMapper, 'toDto')
        .mockReturnValue(expectedResponse as any);

      const result = await service.create(createReviewDto, mockPayload);

      expect(userService.findById).toHaveBeenCalledWith(mockPayload.sub);
      expect(movieService.findById).toHaveBeenCalledWith(
        createReviewDto.movieId,
      );
      expect(reviewMapper.toEntity).toHaveBeenCalledWith(createReviewDto);
      expect(reviewRepository.save).toHaveBeenCalledWith(reviewEntity);
      expect(reviewMapper.toDto).toHaveBeenCalledWith(
        reviewEntity,
        mockMovie,
        mockUser,
      );
      expect(result).toEqual(expectedResponse);
    });

    it('should throw error when user not found', async () => {
      const createReviewDto: CreateReviewDto = {
        userId: mockUser.id,
        movieId: mockMovie.id,
        rating: 9,
        comment: 'Great movie!',
      };

      jest.spyOn(userService, 'findById').mockResolvedValue(null as any);

      await expect(
        service.create(createReviewDto, mockPayload),
      ).rejects.toThrow('User not found');
    });

    it('should throw error when user ID mismatch', async () => {
      const createReviewDto: CreateReviewDto = {
        userId: 'different-user-id',
        movieId: mockMovie.id,
        rating: 9,
        comment: 'Great movie!',
      };

      jest.spyOn(userService, 'findById').mockResolvedValue(mockUser as any);

      await expect(
        service.create(createReviewDto, mockPayload),
      ).rejects.toThrow('User ID mismatch');
    });

    it('should throw error when movie not found', async () => {
      const createReviewDto: CreateReviewDto = {
        userId: mockUser.id,
        movieId: 'non-existent-movie-id',
        rating: 9,
        comment: 'Great movie!',
      };

      jest.spyOn(userService, 'findById').mockResolvedValue(mockUser as any);
      jest.spyOn(movieService, 'findById').mockResolvedValue(null as any);

      await expect(
        service.create(createReviewDto, mockPayload),
      ).rejects.toThrow('Movie not found');
    });
  });

  describe('findAll', () => {
    it('should return all reviews for a user', async () => {
      const reviews = [mockReview];
      const expectedResponse = [
        {
          id: mockReview.id,
          rating: mockReview.rating,
          comment: mockReview.comment,
          movie: {
            id: mockMovie.id,
            title: mockMovie.title,
            description: mockMovie.description,
            rating: mockMovie.rating,
            genre: mockMovie.genre,
            yearRelease: mockMovie.yearRelease,
            createdAt: mockMovie.createdAt,
            updatedAt: mockMovie.updatedAt,
          },
          user: {
            id: mockUser.id,
            name: mockUser.name,
            email: mockUser.email,
            createdAt: mockUser.createdAt,
            updatedAt: mockUser.updatedAt,
          },
          createdAt: mockReview.createdAt,
          updatedAt: mockReview.updatedAt,
        },
      ];

      jest.spyOn(reviewRepository, 'find').mockResolvedValue(reviews);
      jest
        .spyOn(reviewMapper, 'toDto')
        .mockReturnValue(expectedResponse[0] as any);

      const result = await service.findAll(mockPayload);

      expect(reviewRepository.find).toHaveBeenCalledWith({
        where: { user: { id: mockPayload.sub } },
        relations: ['movie'],
      });
      expect(reviewMapper.toDto).toHaveBeenCalledTimes(reviews.length);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('findOne', () => {
    it('should return a review by id', async () => {
      const expectedResponse = {
        id: mockReview.id,
        rating: mockReview.rating,
        comment: mockReview.comment,
        movie: {
          id: mockMovie.id,
          title: mockMovie.title,
          description: mockMovie.description,
          rating: mockMovie.rating,
          genre: mockMovie.genre,
          yearRelease: mockMovie.yearRelease,
          createdAt: mockMovie.createdAt,
          updatedAt: mockMovie.updatedAt,
        },
        user: {
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
          createdAt: mockUser.createdAt,
          updatedAt: mockUser.updatedAt,
        },
        createdAt: mockReview.createdAt,
        updatedAt: mockReview.updatedAt,
      };

      jest.spyOn(reviewRepository, 'findOne').mockResolvedValue(mockReview);
      jest
        .spyOn(reviewMapper, 'toDto')
        .mockReturnValue(expectedResponse as any);

      const result = await service.findOne(mockReview.id, mockPayload);

      expect(reviewRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockReview.id, user: { id: mockPayload.sub } },
        relations: ['movie', 'user'],
      });
      expect(reviewMapper.toDto).toHaveBeenCalledWith(
        mockReview,
        mockReview.movie,
        mockReview.user,
      );
      expect(result).toEqual(expectedResponse);
    });

    it('should throw error when review not found', async () => {
      jest.spyOn(reviewRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.findOne('non-existent-id', mockPayload),
      ).rejects.toThrow('Review not found');
    });
  });

  describe('update', () => {
    it('should update a review successfully', async () => {
      const updateReviewDto: UpdateReviewDto = {
        rating: 10,
        comment: 'Updated comment',
      };

      const expectedResponse = {
        id: mockReview.id,
        rating: 10,
        comment: 'Updated comment',
        movie: {
          id: mockMovie.id,
          title: mockMovie.title,
          description: mockMovie.description,
          rating: mockMovie.rating,
          genre: mockMovie.genre,
          yearRelease: mockMovie.yearRelease,
          createdAt: mockMovie.createdAt,
          updatedAt: mockMovie.updatedAt,
        },
        user: {
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
          createdAt: mockUser.createdAt,
          updatedAt: mockUser.updatedAt,
        },
        createdAt: mockReview.createdAt,
        updatedAt: mockReview.updatedAt,
      };

      jest.spyOn(reviewRepository, 'findOne').mockResolvedValue(mockReview);
      jest.spyOn(reviewRepository, 'merge').mockReturnValue(mockReview);
      jest.spyOn(reviewRepository, 'save').mockResolvedValue(mockReview);
      jest
        .spyOn(reviewMapper, 'toDto')
        .mockReturnValue(expectedResponse as any);

      const result = await service.update(
        mockReview.id,
        updateReviewDto,
        mockPayload,
      );

      expect(reviewRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockReview.id, user: { id: mockPayload.sub } },
        relations: ['movie', 'user'],
      });
      expect(reviewRepository.merge).toHaveBeenCalledWith(
        mockReview,
        updateReviewDto,
      );
      expect(reviewRepository.save).toHaveBeenCalledWith(mockReview);
      expect(reviewMapper.toDto).toHaveBeenCalledWith(
        mockReview,
        mockReview.movie,
        mockReview.user,
      );
      expect(result).toEqual(expectedResponse);
    });

    it('should throw error when review not found for update', async () => {
      const updateReviewDto: UpdateReviewDto = {
        rating: 10,
        comment: 'Updated comment',
      };

      jest.spyOn(reviewRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.update('non-existent-id', updateReviewDto, mockPayload),
      ).rejects.toThrow('Review not found');
    });
  });

  describe('remove', () => {
    it('should remove a review successfully', async () => {
      const expectedResponse = {
        id: mockReview.id,
        rating: mockReview.rating,
        comment: mockReview.comment,
        movie: {
          id: mockMovie.id,
          title: mockMovie.title,
          description: mockMovie.description,
          rating: mockMovie.rating,
          genre: mockMovie.genre,
          yearRelease: mockMovie.yearRelease,
          createdAt: mockMovie.createdAt,
          updatedAt: mockMovie.updatedAt,
        },
        user: {
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
          createdAt: mockUser.createdAt,
          updatedAt: mockUser.updatedAt,
        },
        createdAt: mockReview.createdAt,
        updatedAt: mockReview.updatedAt,
      };

      jest.spyOn(reviewRepository, 'findOne').mockResolvedValue(mockReview);
      jest.spyOn(reviewRepository, 'remove').mockResolvedValue(mockReview);
      jest
        .spyOn(reviewMapper, 'toDto')
        .mockReturnValue(expectedResponse as any);

      const result = await service.remove(mockReview.id, mockPayload);

      expect(reviewRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockReview.id, user: { id: mockPayload.sub } },
        relations: ['movie', 'user'],
      });
      expect(reviewRepository.remove).toHaveBeenCalledWith(mockReview);
      expect(reviewMapper.toDto).toHaveBeenCalledWith(
        mockReview,
        mockReview.movie,
        mockReview.user,
      );
      expect(result).toEqual(expectedResponse);
    });

    it('should throw error when review not found for removal', async () => {
      jest.spyOn(reviewRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.remove('non-existent-id', mockPayload),
      ).rejects.toThrow('Review not found');
    });
  });

  describe('findByUser', () => {
    it('should return all reviews for a specific user', async () => {
      const reviews = [mockReview];
      const userId = mockUser.id;
      const expectedResponse = [
        {
          id: mockReview.id,
          rating: mockReview.rating,
          comment: mockReview.comment,
          movie: {
            id: mockMovie.id,
            title: mockMovie.title,
            description: mockMovie.description,
            rating: mockMovie.rating,
            genre: mockMovie.genre,
            yearRelease: mockMovie.yearRelease,
            createdAt: mockMovie.createdAt,
            updatedAt: mockMovie.updatedAt,
          },
          user: {
            id: mockUser.id,
            name: mockUser.name,
            email: mockUser.email,
            createdAt: mockUser.createdAt,
            updatedAt: mockUser.updatedAt,
          },
          createdAt: mockReview.createdAt,
          updatedAt: mockReview.updatedAt,
        },
      ];

      jest.spyOn(reviewRepository, 'find').mockResolvedValue(reviews);
      jest
        .spyOn(reviewMapper, 'toDto')
        .mockReturnValue(expectedResponse[0] as any);

      const result = await service.findByUser(userId);

      expect(reviewRepository.find).toHaveBeenCalledWith({
        where: { user: { id: userId } },
      });
      expect(reviewMapper.toDto).toHaveBeenCalledTimes(reviews.length);
      expect(result).toEqual(expectedResponse);
    });
  });
});
