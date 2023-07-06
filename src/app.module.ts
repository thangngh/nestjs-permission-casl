import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'auth/authentication';
import { RoleModule } from './models/role/role.module';
import { GroupModule } from './models/group/group.module';
import { GroupUserModule } from './models/group-user/group-user.module';
import { GroupPermissionModule } from './models/group-permission/group-permission.module';
import { BaseModule } from './base';
import { CommonModule } from './common';
import { DatabaseModule } from '@config/database/database.module';
import { UserModule } from '@models/user/user.module';
import { PermissionModule } from '@models/permission';
import { CaslModule } from 'auth/casl/casl.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    PermissionModule,
    AuthModule,
    RoleModule,
    GroupModule,
    GroupPermissionModule,
    GroupUserModule,
    BaseModule,
    CommonModule,
    CaslModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
