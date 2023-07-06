import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AppAbility, CaslAbilityFactory, CaslPermission, Subjects } from "./casl-ability.factory";
import { Reflector } from "@nestjs/core";
import { PERMISSION_CHECKER_KEY, RequiredPermission } from "./casl.decorator";
import { Ability, AbilityBuilder } from "@casl/ability";
import { EAction } from "@base/base.interface";
import { User } from "@models/user/entities/user.entity";

@Injectable()
export class CaslGuard implements CanActivate {

	constructor(
		private reflector: Reflector,
		private caslAbilityFactory: CaslAbilityFactory,
	) { }

	async canActivate(context: ExecutionContext) {
		const requiredPermissions =
			this.reflector.get<RequiredPermission[]>(PERMISSION_CHECKER_KEY, context.getHandler()) || [];
		console.log("requiredPermissions", requiredPermissions)
		const request = context.switchToHttp().getRequest();
		const user = request.user;

		const ability = await this.caslAbilityFactory.createForUser(user);
		const checkCheck = requiredPermissions.every(permission => this.isAllowed(ability, permission));
		console.log("checkCheck", checkCheck)
		return requiredPermissions.every(permission => this.isAllowed(ability, permission));
	}

	// private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
	// 	if (typeof handler === 'function') {
	// 		return handler(ability);
	// 	}
	// 	return handler.handle(ability);
	// }

	private isAllowed(ability: AppAbility, permission: RequiredPermission): boolean {
		const [action, subject] = permission;
		const parseConditions = ability.rules.filter(rule => rule.action === action && rule.subject === subject)
		console.log("parseConditions", parseConditions)
		return ability.can(action, subject, parseConditions.map((rule: CaslPermission) => rule.condition).join(" "));
	}
}