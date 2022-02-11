import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '@users/dtos/create-user.dto';
import { UsersService } from '@users/users.service';
import { UpdateUserDto } from '@users/dtos/update-user.dto';
import { Serialize } from '@interceptors/serialize.interceptor';
import { UserDto } from '@users/dtos/user.dto';


@ApiTags('Users')
@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body.email, body.password);
  }


  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) throw new NotFoundException('user not found');
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