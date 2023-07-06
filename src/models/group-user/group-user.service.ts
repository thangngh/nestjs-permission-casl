import { Injectable } from '@nestjs/common';
import { CreateGroupUserDto } from './dto/create-group-user.dto';
import { UpdateGroupUserDto } from './dto/update-group-user.dto';
import { Base } from '@base/entities';
import { GroupUser } from './entities/group-user.entity';
import { User } from '@models/user/entities/user.entity';
import { Group } from '@models/group/entities/group.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@base/services';

export interface PermissionCondition { }

@Injectable()
export class GroupUserService extends BaseService<GroupUser | User | Group> {
	constructor(
		@InjectRepository(GroupUser)
		private readonly groupUserRepository: Repository<GroupUser>,
	) {
		super()
	}

	async getFromUserNames(userNames: string) {
		const users = await this.groupUserRepository.findOne({
			where: {
				user: { userName: userNames },
			},
			relations: ['groups', 'groups.groupPermission', 'groups.groupPermission.permissions']
		});

		return users;
	}

	public static parseCondition(condition: PermissionCondition, variables: Record<string, any>): PermissionCondition {
		if (!condition) return null;
		const parsedCondition = {};
		for (const [key, rawValue] of Object.entries(condition)) {
			if (rawValue !== null && typeof rawValue === "object") {
				const value = this.parseCondition(rawValue, variables);
				parsedCondition[key] = value;
				continue;
			}
			if (typeof rawValue !== "string") {
				parsedCondition[key] = rawValue;
				continue;
			}
			// find placeholder "${}""
			const matches = /^\\${([a-zA-Z0-9]+)}$/.exec(rawValue);
			if (!matches) {
				parsedCondition[key] = rawValue;
				continue;
			}
			const value = variables[matches[1]];
			if (typeof value === "undefined") {
				throw new ReferenceError(`Variable ${name} is not defined`);
			}
			parsedCondition[key] = value;
		}

		return parsedCondition;
	}
}
