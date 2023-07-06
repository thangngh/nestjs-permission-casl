import { Module, forwardRef } from "@nestjs/common";
import { AuthController } from "./authentication.controller";
import { AuthService } from "./authentication.service";
import { UserModule } from "@models/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import 'dotenv/config';
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
@Module({
	imports: [
		UserModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '30d' },
		}),
	],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	exports: [AuthService],
	controllers: [AuthController],
})
export class AuthModule { }