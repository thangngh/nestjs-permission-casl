import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupUser } from '@models/group-user/entities/group-user.entity';
import { GroupPermission } from '@models/group-permission/entities/group-permission.entity';
import { Group } from './entities/group.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group, GroupUser, GroupPermission])
  ],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule { }
