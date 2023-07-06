import { Base } from "@base/entities";
import { GroupPermission } from "@models/group-permission/entities/group-permission.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permission extends Base {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	action: string;

	@Column({ nullable: true })
	subject: string;

	@Column({ nullable: true, type: 'simple-array' })
	fields: string[];

	@Column({ nullable: true, type: 'jsonb' })
	condition: any;

	@OneToMany(() => GroupPermission, groupPermission => groupPermission.permissions)
	groupPermission: GroupPermission[];
}
