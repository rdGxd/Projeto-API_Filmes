import { Test, TestingModule } from '@nestjs/testing';
import { PayloadDto } from '../../auth/dto/payload.dto';
import { Roles } from '../../common/enums/role.enum';
import { ReviewController } from '../controllers/review.controller';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { ReviewService } from '../services/review.service';

describe('ReviewController', () => {
  let controller: ReviewController;
  let reviewService: any;

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
    const mockReviewService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [
        {
          provide: ReviewService,
          useValue: mockReviewService,
        },
      ],
    }).compile();

    controller = module.get<ReviewController>(ReviewController);
    reviewService = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(reviewService).toBeDefined();
  });

  describe('create', () => {
    it('should call reviewService.create with correct parameters', async () => {
      const createReviewDto: CreateReviewDto = {
        userId: mockPayload.sub,
        movieId: '123e4567-e89b-12d3-a456-426614174001',
        rating: 8,
        comment: 'Great movie!',
      };
      const mockResponse = { id: '1', ...createReviewDto };

      reviewService.create.mockResolvedValue(mockResponse);

      const result = await controller.create(createReviewDto, mockPayload);

      expect(reviewService.create).toHaveBeenCalledWith(
        createReviewDto,
        mockPayload,
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findAll', () => {
    it('should call reviewService.findAll with correct parameters', async () => {
      const mockResponse = [{ id: '1', userId: mockPayload.sub, rating: 8 }];

      reviewService.findAll.mockResolvedValue(mockResponse);

      const result = await controller.findAll(mockPayload);

      expect(reviewService.findAll).toHaveBeenCalledWith(mockPayload);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findOne', () => {
    it('should call reviewService.findOne with correct parameters', async () => {
      const reviewId = '123e4567-e89b-12d3-a456-426614174002';
      const mockResponse = { id: reviewId, userId: mockPayload.sub, rating: 8 };

      reviewService.findOne.mockResolvedValue(mockResponse);

      const result = await controller.findOne(reviewId, mockPayload);

      expect(reviewService.findOne).toHaveBeenCalledWith(reviewId, mockPayload);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('update', () => {
    it('should call reviewService.update with correct parameters', async () => {
      const reviewId = '123e4567-e89b-12d3-a456-426614174002';
      const updateReviewDto: UpdateReviewDto = {
        rating: 9,
        comment: 'Updated comment',
      };
      const mockResponse = { id: reviewId, ...updateReviewDto };

      reviewService.update.mockResolvedValue(mockResponse);

      const result = await controller.update(
        reviewId,
        updateReviewDto,
        mockPayload,
      );

      expect(reviewService.update).toHaveBeenCalledWith(
        reviewId,
        updateReviewDto,
        mockPayload,
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('remove', () => {
    it('should call reviewService.remove with correct parameters', async () => {
      const reviewId = '123e4567-e89b-12d3-a456-426614174002';
      const mockResponse = { id: reviewId, deleted: true };

      reviewService.remove.mockResolvedValue(mockResponse);

      const result = await controller.remove(reviewId, mockPayload);

      expect(reviewService.remove).toHaveBeenCalledWith(reviewId, mockPayload);
      expect(result).toEqual(mockResponse);
    });
  });
});
