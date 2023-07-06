import { User } from "@models/user/entities/user.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'role_name' })
	roleName: string;

	@OneToMany(() => User, user => user.role)
	users: User[];
}
