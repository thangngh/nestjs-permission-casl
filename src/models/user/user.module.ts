import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { GroupUser } from '@models/group-user/entities/group-user.entity';
import { Role } from '@models/role';
import { GroupUserModule } from '@models/group-user';
import { CaslModule } from 'auth/casl/casl.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, GroupUser]),
    GroupUserModule,
    forwardRef(() => CaslModule)
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
