import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./authentication.service";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService
	) { }

	@Post('login')
	async login(@Body() body: any) {
		return this.authService.login(body);
	}
}