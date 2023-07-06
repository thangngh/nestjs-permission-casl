import { Group } from "@models/group/entities/group.entity";
import { User } from "@models/user/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GroupUser extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number;


	@Column({ name: 'group_id' })
	groupId: number;

	@Column({ name: 'user_id' })
	userId: number;

	@ManyToOne(() => Group, group => group.groupUser)
	@JoinColumn({ name: 'group_id' })
	groups: Group;

	@ManyToOne(() => User, user => user.groupUser)
	@JoinColumn({ name: 'user_id' })
	user: User;

	constructor(partial?: Partial<GroupUser>) {
		super();
		Object.assign(this, partial);
	}
}	
