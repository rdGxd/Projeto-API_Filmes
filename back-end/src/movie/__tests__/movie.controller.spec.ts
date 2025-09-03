import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from '../controllers/movie.controller';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { FilterMovieDto } from '../dto/filter-movie.dto';
import { MovieService } from '../services/movie.service';
import { genreEnum } from '../enums/genreEnum';

describe('MovieController', () => {
  let controller: MovieController;
  let movieService: any;

  beforeEach(async () => {
    const mockMovieService = {
      create: jest.fn(),
      filterMovies: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: mockMovieService,
        },
      ],
    }).compile();

    controller = module.get<MovieController>(MovieController);
    movieService = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(movieService).toBeDefined();
  });

  describe('create', () => {
    it('should call movieService.create with correct parameters', async () => {
      const createMovieDto: CreateMovieDto = {
        title: 'Test Movie',
        description: 'Test Description',
        genre: genreEnum.Ação,
        coverImage: 'http://example.com/image.jpg',
        yearRelease: 2023,
        rating: 8.5,
      };
      const mockResponse = { id: '1', ...createMovieDto };

      movieService.create.mockResolvedValue(mockResponse);

      const result = await controller.create(createMovieDto);

      expect(movieService.create).toHaveBeenCalledWith(createMovieDto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('search', () => {
    it('should call movieService.filterMovies with correct parameters', async () => {
      const filterDto: FilterMovieDto = { genre: 'action', year: '2023' };
      const mockResponse = [{ id: '1', title: 'Test Movie' }];

      movieService.filterMovies.mockResolvedValue(mockResponse);

      const result = await controller.search(filterDto);

      expect(movieService.filterMovies).toHaveBeenCalledWith(filterDto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findOne', () => {
    it('should call movieService.findOne with correct parameters', async () => {
      const movieId = '123e4567-e89b-12d3-a456-426614174000';
      const mockResponse = { id: movieId, title: 'Test Movie' };

      movieService.findOne.mockResolvedValue(mockResponse);

      const result = await controller.findOne(movieId);

      expect(movieService.findOne).toHaveBeenCalledWith(movieId);
      expect(result).toEqual(mockResponse);
    });
  });
});
