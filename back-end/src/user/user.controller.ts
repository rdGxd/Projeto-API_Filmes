import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SetRoutePolicy } from 'src/auth/decorators/set-route-policy.decorator';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { Roles } from 'src/auth/enums/roles.enums';
import { AuthAndPolicyGuard } from 'src/auth/guards/auth-and-policy.guard';
import { TokenPayLoadParam } from 'src/auth/params/token-payload.param';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthAndPolicyGuard)
  @SetRoutePolicy(Roles.Admin)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthAndPolicyGuard)
  @SetRoutePolicy(Roles.Admin, Roles.User)
  findOne(
    @Param('id') id: string,
    @TokenPayLoadParam() tokenPayload: PayloadDto,
  ) {

    return this.userService.findOne(id, tokenPayload);
  }

  @Patch(':id')
  @UseGuards(AuthAndPolicyGuard)
  @SetRoutePolicy(Roles.Admin, Roles.User)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @TokenPayLoadParam() tokenPayload: PayloadDto,
  ) {
    return this.userService.update(id, updateUserDto, tokenPayload);
  }

  @Delete(':id')
  @UseGuards(AuthAndPolicyGuard)
  @SetRoutePolicy(Roles.Admin, Roles.User)
  remove(
    @Param('id') id: string,
    @TokenPayLoadParam() tokenPayload: PayloadDto,
  ) {
    return this.userService.remove(id, tokenPayload);
  }
}
