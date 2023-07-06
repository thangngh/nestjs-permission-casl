import { EAction } from "@base/base.interface";
import { Ability, InferSubjects } from "@casl/ability";
import { GroupUserService, PermissionCondition } from "@models/group-user";
import { User } from "@models/user/entities/user.entity";
import { UserService } from "@models/user/user.service";
import { Injectable } from "@nestjs/common";

export type PermissionObjectType = any;
export type AppAbility = Ability<[EAction, PermissionObjectType]>;
export type Subjects = typeof User | 'all';
export interface CaslPermission {
	action: EAction;
	subject: any;
	condition?: PermissionCondition;
}

@Injectable()
export class CaslAbilityFactory {
	constructor(
		private readonly UserService: UserService,
	) { }

	async createForUser(user: User) {
		const dbUserPermission = await this.UserService.findOne(user.userName);
		const caslPermissions: CaslPermission[] = dbUserPermission.groups.groupPermission.map((p) => ({
			action: p.permissions.action as EAction,
			subject: p.permissions.subject,
			condition: JSON.stringify(GroupUserService.parseCondition(p.permissions.condition, user))
		}))

		return new Ability<[EAction, PermissionObjectType]>(caslPermissions);
	}
}