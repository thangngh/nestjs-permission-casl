import { Module } from '@nestjs/common';
import { GroupUserService } from './group-user.service';
import { GroupUserController } from './group-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@models/user/entities/user.entity';
import { Group } from '@models/group/entities/group.entity';
import { GroupUser } from './entities/group-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group, User, GroupUser])
  ],
  controllers: [GroupUserController],
  providers: [GroupUserService],
  exports: [GroupUserService]
})
export class GroupUserModule { }
