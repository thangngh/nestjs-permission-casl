import { Base } from "@base/entities";
import { Group } from "@models/group/entities/group.entity";
import { Permission } from "@models/permission/entities/permission.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GroupPermission extends Base {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'group_id' })
	groupId: number;

	@Column({ name: 'permission_id' })
	permissionId: number;

	@ManyToOne(() => Group, group => group.groupPermission)
	@JoinColumn({ name: 'group_id' })
	groups: Group;

	@ManyToOne(() => Permission, group => group.groupPermission)
	@JoinColumn({ name: 'permission_id' })
	permissions: Permission;
}
