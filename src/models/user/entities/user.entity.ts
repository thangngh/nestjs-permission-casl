import { Base } from "@base/entities";
import { BeforeInsert, BeforeUpdate, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Role } from "@models/role/entities/role.entity";
import { GroupUser } from "@models/group-user/entities/group-user.entity";
@Entity()
export class User extends Base {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 50, unique: true, name: 'user_name' })
	userName: string;

	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword() {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
	}
	async validatePassword(password: string): Promise<boolean> {
		const isMatch = await bcrypt.compare(password, this.password);
		return isMatch;
	}

	@Column({ name: 'password', length: 100 })
	password: string;

	@Column({ name: 'first_name', length: 50 })
	@Index()
	firstName: string;

	@Column({ name: 'role_id' })
	roleId: number;

	@ManyToOne(() => Role, role => role.users)
	@JoinColumn({ name: 'role_id' })
	role: Role;

	@OneToMany(() => GroupUser, groupUser => groupUser.user)
	groupUser: GroupUser[];

	constructor(partial?: Partial<User>) {
		super();
		Object.assign(this, partial);
	}
}
