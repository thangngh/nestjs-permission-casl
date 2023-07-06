import { IJwtPayload } from "@common/interface";
import { UserService } from "@models/user/user.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) { }

	async login(payload: any) {
		const { username, password } = payload;
		const user = await this.userService.isUser(username);

		if (user?.password === null) {
			throw new HttpException(
				'Invalid username or password',
				HttpStatus.UNAUTHORIZED,
			);
		}
		const isMatch = await user?.validatePassword(password as string);
		if (!isMatch || !user) {
			throw new HttpException(
				'Invalid username or password',
				HttpStatus.UNAUTHORIZED,
			);
		}

		const jwtPayload: IJwtPayload = { userName: user.userName, email: user.firstName };

		return {
			status: HttpStatus.OK,
			message: 'Login Successful!',
			accessToken: this.jwtService.sign(jwtPayload),
		};
	}

	async validateUser(username: string, password: string) {
		const user = await this.userService.isUser(username);
		if (user && user.password === password) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}


	async validateUserJwt(payload: IJwtPayload) {
		const { email, sub, userName } = payload;
		const user = await this.userService.isUser(userName);
		if (!user) {
			throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
		}
		return user;
	}
}