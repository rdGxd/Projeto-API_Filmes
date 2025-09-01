import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/set-is-public-policy.decorator';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { TokenPayLoadParam } from 'src/common/decorators/token-payload.param.decorator';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { ReviewService } from '../services/review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @TokenPayLoadParam() payload: PayloadDto,
  ) {
    return await this.reviewService.create(createReviewDto, payload);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@TokenPayLoadParam() payload: PayloadDto) {
    return await this.reviewService.findAll(payload);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @TokenPayLoadParam() payload: PayloadDto,
  ) {
    return await this.reviewService.findOne(id, payload);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
    @TokenPayLoadParam() payload: PayloadDto,
  ) {
    return await this.reviewService.update(id, updateReviewDto, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @TokenPayLoadParam() payload: PayloadDto) {
    await this.reviewService.remove(id, payload);
  }
}
