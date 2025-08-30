import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SetRoutePolicy } from 'src/auth/decorators/set-route-policy.decorator';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { TokenPayLoadParam } from 'src/common/decorators/token-payload.param.decorator';
import { Roles } from 'src/common/enums/role.enum';
import { CreateFavoriteDto } from '../dto/create-favorite.dto';
import { UpdateFavoriteDto } from '../dto/update-favorite.dto';
import { FavoriteService } from '../services/favorite.service';

@Controller('favorite')
@SetRoutePolicy(Roles.Admin, Roles.User)
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  create(
    @Body() createFavoriteDto: CreateFavoriteDto,
    @TokenPayLoadParam() payload: PayloadDto,
  ) {
    return this.favoriteService.create(createFavoriteDto, payload);
  }

  @Get()
  findAll(@TokenPayLoadParam() payload: PayloadDto) {
    return this.favoriteService.findAll(payload);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @TokenPayLoadParam() payload: PayloadDto) {
    return this.favoriteService.findOne(id, payload);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFavoriteDto: UpdateFavoriteDto,
    @TokenPayLoadParam() payload: PayloadDto,
  ) {
    return this.favoriteService.update(id, updateFavoriteDto, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @TokenPayLoadParam() payload: PayloadDto) {
    return this.favoriteService.remove(id, payload);
  }
}
