import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupUserService } from './group-user.service';
import { CreateGroupUserDto } from './dto/create-group-user.dto';
import { UpdateGroupUserDto } from './dto/update-group-user.dto';

@Controller('group-user')
export class GroupUserController {
  constructor(private readonly groupUserService: GroupUserService) { }


}
