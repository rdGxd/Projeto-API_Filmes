import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { MovieService } from 'src/movie/services/movie.service';
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { Review } from '../entities/review.entity';
import { ReviewMapper } from '../mapper/review-mapper';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly reviewMapper: ReviewMapper,
    private readonly userService: UserService,
    private readonly movieService: MovieService,
  ) {}

  async create(createReviewDto: CreateReviewDto, payload: PayloadDto) {
    // Verificar se o usuário existe
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verificar se o filme existe
    const movie = await this.movieService.findById(createReviewDto.movieId);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    // Criar a review
    const review = new Review();
    review.rating = createReviewDto.rating;
    review.comment = createReviewDto.comment;
    review.user = user;
    review.movie = movie;

    // Salvar a review
    const savedReview = await this.reviewRepository.save(review);

    return this.reviewMapper.toDto(savedReview, movie, user);
  }

  async findAll(payload: PayloadDto) {
    const reviews = await this.reviewRepository.find({
      where: { user: { id: payload.sub } },
      relations: ['movie', 'user'],
    });
    return reviews.map((review) =>
      this.reviewMapper.toDto(review, review.movie, review.user),
    );
  }

  async findOne(id: string, payload: PayloadDto) {
    const review = await this.reviewRepository.findOne({
      where: { id, user: { id: payload.sub } },
      relations: ['movie', 'user'],
    });
    if (!review) throw new NotFoundException('Review not found');
    return this.reviewMapper.toDto(review, review.movie, review.user);
  }

  async update(
    id: string,
    updateReviewDto: UpdateReviewDto,
    payload: PayloadDto,
  ) {
    const review = await this.reviewRepository.findOne({
      where: { id, user: { id: payload.sub } },
      relations: ['movie', 'user'],
    });
    if (!review) throw new NotFoundException('Review not found');
    this.reviewRepository.merge(review, updateReviewDto);
    await this.reviewRepository.save(review);
    return this.reviewMapper.toDto(review, review.movie, review.user);
  }

  async remove(id: string, payload: PayloadDto) {
    const review = await this.reviewRepository.findOne({
      where: { id, user: { id: payload.sub } },
      relations: ['movie', 'user'],
    });
    if (!review) throw new NotFoundException('Review not found');
    await this.reviewRepository.remove(review);
    return this.reviewMapper.toDto(review, review.movie, review.user);
  }

  async findByUser(userId: string) {
    const reviews = await this.reviewRepository.find({
      where: { user: { id: userId } },
    });
    return reviews.map((review) =>
      this.reviewMapper.toDto(review, review.movie, review.user),
    );
  }
}
