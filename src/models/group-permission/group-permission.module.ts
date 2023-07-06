import { Module } from '@nestjs/common';
import { GroupPermissionService } from './group-permission.service';
import { GroupPermissionController } from './group-permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupPermission } from './entities/group-permission.entity';
import { Permission } from '@models/permission/entities/permission.entity';
import { Group } from '@models/group/entities/group.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupPermission, Group, Permission])
  ],
  controllers: [GroupPermissionController],
  providers: [GroupPermissionService]
})
export class GroupPermissionModule { }
