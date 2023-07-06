import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from 'express';

export const AuthUser = createParamDecorator((data: keyof User, ctx: ExecutionContext) => {
	const user = ctx.switchToHttp().getRequest<Request>();
	return data ? user && user[data] : user;
})

//fake user interface, should be entity user
interface User {
	id: number;
	username: string;
	email: string;
}