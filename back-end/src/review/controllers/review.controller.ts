import {
  Body,
  Controller,
  Delete,
  Get,
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
  create(
    @Body() createReviewDto: CreateReviewDto,
    @TokenPayLoadParam() payload: PayloadDto,
  ) {
    return this.reviewService.create(createReviewDto, payload);
  }

  @Get()
  findAll(@TokenPayLoadParam() payload: PayloadDto) {
    return this.reviewService.findAll(payload);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string, @TokenPayLoadParam() payload: PayloadDto) {
    return this.reviewService.findOne(id, payload);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
    @TokenPayLoadParam() payload: PayloadDto,
  ) {
    return this.reviewService.update(id, updateReviewDto, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @TokenPayLoadParam() payload: PayloadDto) {
    return this.reviewService.remove(id, payload);
  }
}
