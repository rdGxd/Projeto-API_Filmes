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
import { SetRoutePolicy } from 'src/auth/decorators/set-route-policy.decorator';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { TokenPayLoadParam } from 'src/common/decorators/token-payload.param.decorator';
import { Roles } from 'src/common/enums/role.enum';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @SetRoutePolicy(Roles.Admin)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @SetRoutePolicy(Roles.Admin, Roles.User)
  findOne(
    @Param('id') id: string,
    @TokenPayLoadParam() tokenPayload: PayloadDto,
  ) {
    return this.userService.findOne(id, tokenPayload);
  }

  @Patch(':id')
  @SetRoutePolicy(Roles.Admin, Roles.User)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @TokenPayLoadParam() tokenPayload: PayloadDto,
  ) {
    return this.userService.update(id, updateUserDto, tokenPayload);
  }

  @Delete(':id')
  @SetRoutePolicy(Roles.Admin, Roles.User)
  remove(
    @Param('id') id: string,
    @TokenPayLoadParam() tokenPayload: PayloadDto,
  ) {
    return this.userService.remove(id, tokenPayload);
  }
}
