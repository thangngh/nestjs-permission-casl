import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupPermission } from '@models/group-permission/entities/group-permission.entity';
import { Permission } from './entities/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission, GroupPermission])
  ],
  controllers: [PermissionController],
  providers: [PermissionService]
})
export class PermissionModule { }
