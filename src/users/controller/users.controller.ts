/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, Render, UseFilters, Res } from '@nestjs/common';
import { AuthExceptionFilter } from 'src/common/filters/auth-exceptions.filter';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import CreateUserDto from 'src/dto/user.dto';
import { UsersService } from '../service/users.service';


@Controller('users')
@UseFilters(AuthExceptionFilter)
export class UsersController {
  constructor(private readonly userService: UsersService) { }


  @UseGuards(AuthenticatedGuard)
  @Get('/')
  @Render('users/index')
  async getUsers() {
    return {
      users: await this.userService.getUsers(),
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Render('users/show')
  @Get('show/:id')
  async findUsersById(@Param('id', ParseIntPipe) id: number) {
    return {
      user: await this.userService.findUsersById(id),
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Render('users/create')
  @Get('/create')
  viewCreateUser() {
    return;
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/store')
  async createUser(@Body() request: CreateUserDto, @Res() res: any) {
    await this.userService.createUser(request)
    return res.redirect('/users')
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/update/:id')
  async updateUser(@Body() request: CreateUserDto, @Param('id') userId: number, @Res() res: any) {
    await this.userService.updateUser(request, userId)
    return res.redirect('/users');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/delete/:id')
  async deleteUser(@Param('id') userId: number, @Res() res: any) {
    await this.userService.deleteUser(userId)
    return res.redirect('/users');
  }

}
