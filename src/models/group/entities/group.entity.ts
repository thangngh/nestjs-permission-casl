import { Base } from "@base/entities";
import { GroupPermission } from "@models/group-permission/entities/group-permission.entity";
import { GroupUser } from "@models/group-user/entities/group-user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Group extends Base {

	@PrimaryGeneratedColumn()
	id: number

	@Column({ name: 'group_name' })
	groupName: string;

	@OneToMany(() => GroupPermission, groupPermission => groupPermission.groups)
	groupPermission: GroupPermission[];

	@OneToMany(() => GroupUser, groupUser => groupUser.groups)
	groupUser: GroupUser[];
}
