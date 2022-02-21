import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '@users/dtos/create-user.dto';
import { UsersService } from '@users/users.service';
import { UpdateUserDto } from '@users/dtos/update-user.dto';
import { Serialize } from '@interceptors/serialize.interceptor';
import { UserDto } from '@users/dtos/user.dto';
import { AuthService } from '@users/auth.service';
import { CurrentUser } from '@users/decorators/current-user.decorator';
import { User } from '@users/user.entity';
import { AuthGuard } from '@users/guards/auth.guard';

@Serialize(UserDto)
@ApiTags('Users')
@Controller('auth')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }


  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }


  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) throw new NotFoundException('user not found');
    return user;
  }


  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

}
