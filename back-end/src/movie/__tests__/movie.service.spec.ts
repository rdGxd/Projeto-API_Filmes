import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { Movie } from '../entities/movie.entity';
import { genreEnum } from '../enums/genreEnum';
import { MovieMapper } from '../mapper/movie-mapper';
import { MovieService } from '../services/movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let movieRepository: Repository<Movie>;
  let movieMapper: MovieMapper;

  const mockMovie: Movie = {
    id: randomUUID(),
    title: 'Test Movie',
    description: 'Test Description for the movie',
    genre: genreEnum.Ação,
    coverImage: 'http://example.com/image.jpg',
    yearRelease: 2023,
    rating: 8.5,
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
            merge: jest.fn(),
          },
        },
        {
          provide: MovieMapper,
          useValue: {
            toEntity: jest.fn(),
            toResponse: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
    movieRepository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
    movieMapper = module.get<MovieMapper>(MovieMapper);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(movieRepository).toBeDefined();
    expect(movieMapper).toBeDefined();
  });

  describe('create', () => {
    it('should create a movie successfully', async () => {
      const createMovieDto: CreateMovieDto = {
        title: 'Test Movie',
        description: 'Test Description for the movie',
        genre: genreEnum.Ação,
        coverImage: 'http://example.com/image.jpg',
        yearRelease: 2023,
        rating: 8.5,
      };

      const movieEntity = {
        title: createMovieDto.title,
        description: createMovieDto.description,
        genre: createMovieDto.genre,
        yearRelease: createMovieDto.yearRelease,
        rating: createMovieDto.rating,
      } as Movie;

      const expectedResponse = {
        id: mockMovie.id,
        title: mockMovie.title,
        description: mockMovie.description,
        genre: mockMovie.genre,
        yearRelease: mockMovie.yearRelease,
        rating: mockMovie.rating,
      };

      jest.spyOn(movieMapper, 'toEntity').mockReturnValue(movieEntity);
      jest.spyOn(movieRepository, 'save').mockResolvedValue(mockMovie);
      jest
        .spyOn(movieMapper, 'toResponse')
        .mockReturnValue(expectedResponse as any);

      const result = await service.create(createMovieDto);

      expect(movieMapper.toEntity).toHaveBeenCalledWith(createMovieDto);
      expect(movieRepository.save).toHaveBeenCalledWith(movieEntity);
      expect(movieMapper.toResponse).toHaveBeenCalledWith(movieEntity);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('findAll', () => {
    it('should return all movies', async () => {
      const movies = [mockMovie];
      const expectedResponse = [
        {
          id: mockMovie.id,
          title: mockMovie.title,
          description: mockMovie.description,
          genre: mockMovie.genre,
          yearRelease: mockMovie.yearRelease,
          rating: mockMovie.rating,
        },
      ];

      jest.spyOn(movieRepository, 'find').mockResolvedValue(movies);
      jest
        .spyOn(movieMapper, 'toResponse')
        .mockReturnValue(expectedResponse[0] as any);

      const result = await service.findAll();

      expect(movieRepository.find).toHaveBeenCalled();
      expect(movieMapper.toResponse).toHaveBeenCalledTimes(movies.length);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('findOne', () => {
    it('should return a movie by id', async () => {
      const expectedResponse = {
        id: mockMovie.id,
        title: mockMovie.title,
        description: mockMovie.description,
        genre: mockMovie.genre,
        yearRelease: mockMovie.yearRelease,
        rating: mockMovie.rating,
      };

      jest.spyOn(movieRepository, 'findOne').mockResolvedValue(mockMovie);
      jest
        .spyOn(movieMapper, 'toResponse')
        .mockReturnValue(expectedResponse as any);

      const result = await service.findOne(mockMovie.id);

      expect(movieRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockMovie.id },
        relations: ['reviews'],
      });
      expect(movieMapper.toResponse).toHaveBeenCalledWith(mockMovie);
      expect(result).toEqual(expectedResponse);
    });

    it('should throw error when movie not found', async () => {
      jest.spyOn(movieRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne('non-existent-id')).rejects.toThrow(
        'Movie not found',
      );
    });
  });

  describe('update', () => {
    it('should update a movie successfully', async () => {
      const updateMovieDto: UpdateMovieDto = {
        title: 'Updated Movie Title',
        reviews: [],
      };

      const updatedMovie = { ...mockMovie, title: 'Updated Movie Title' };
      const expectedResponse = {
        id: updatedMovie.id,
        title: updatedMovie.title,
        description: updatedMovie.description,
        genre: updatedMovie.genre,
        yearRelease: updatedMovie.yearRelease,
        rating: updatedMovie.rating,
      };

      jest.spyOn(movieRepository, 'findOneBy').mockResolvedValue(mockMovie);
      jest
        .spyOn(movieRepository, 'merge')
        .mockImplementation((target, source) => {
          Object.assign(target, source);
          return target;
        });
      jest.spyOn(movieRepository, 'save').mockResolvedValue(updatedMovie);
      jest
        .spyOn(movieMapper, 'toResponse')
        .mockReturnValue(expectedResponse as any);

      const result = await service.update(mockMovie.id, updateMovieDto);

      expect(movieRepository.findOneBy).toHaveBeenCalledWith({
        id: mockMovie.id,
      });
      expect(movieRepository.merge).toHaveBeenCalledWith(mockMovie, {
        title: updateMovieDto.title,
        genre: updateMovieDto.genre,
        rating: updateMovieDto.rating,
        yearRelease: updateMovieDto.yearRelease,
        reviews: updateMovieDto.reviews,
      });
      expect(movieRepository.save).toHaveBeenCalledWith(mockMovie);
      expect(movieMapper.toResponse).toHaveBeenCalledWith(mockMovie);
      expect(result).toEqual(expectedResponse);
    });

    it('should throw error when movie not found for update', async () => {
      const updateMovieDto: UpdateMovieDto = {
        title: 'Updated Title',
        reviews: [],
      };

      jest.spyOn(movieRepository, 'findOneBy').mockResolvedValue(null);

      await expect(
        service.update('non-existent-id', updateMovieDto),
      ).rejects.toThrow('Movie not found');
    });
  });

  describe('remove', () => {
    it('should remove a movie successfully', async () => {
      jest.spyOn(movieRepository, 'findOneBy').mockResolvedValue(mockMovie);
      jest.spyOn(movieRepository, 'remove').mockResolvedValue(mockMovie);
      jest.spyOn(movieMapper, 'toResponse').mockReturnValue({
        id: mockMovie.id,
        title: mockMovie.title,
        description: mockMovie.description,
        genre: mockMovie.genre,
        yearRelease: mockMovie.yearRelease,
        rating: mockMovie.rating,
      } as any);

      const result = await service.remove(mockMovie.id);

      expect(movieRepository.findOneBy).toHaveBeenCalledWith({
        id: mockMovie.id,
      });
      expect(movieRepository.remove).toHaveBeenCalledWith(mockMovie);
      expect(movieMapper.toResponse).toHaveBeenCalledWith(mockMovie);
      expect(result).toBeDefined();
    });

    it('should throw error when movie not found for removal', async () => {
      jest.spyOn(movieRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.remove('non-existent-id')).rejects.toThrow(
        'Movie not found',
      );
    });
  });
});
