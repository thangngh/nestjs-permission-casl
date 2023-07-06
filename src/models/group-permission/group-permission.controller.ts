import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupPermissionService } from './group-permission.service';
import { CreateGroupPermissionDto } from './dto/create-group-permission.dto';
import { UpdateGroupPermissionDto } from './dto/update-group-permission.dto';

@Controller('group-permission')
export class GroupPermissionController {
  constructor(private readonly groupPermissionService: GroupPermissionService) { }


}
