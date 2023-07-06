import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'auth/authentication/guards/jwt.guard';
import { CaslGuard } from 'auth/casl/casl.guard';
import { CheckPermissions } from 'auth/casl/casl.decorator';
import { EAction } from '@base/base.interface';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("/get-one/:userName")
  findOne(@Param('userName') userName: string) {
    return this.userService.findOne(userName);
  }

  @UseGuards(JwtGuard, CaslGuard)
  @CheckPermissions([EAction['Read'], 'user'])
  @Get("/get-all")
  findAll() {
    return this.userService.findAll();
  }

  // @Post("/add-user")
  // addUser(@Body() body: CreateUserDto) {
  //   return this.userService.addUser(body);
  // }
} 
