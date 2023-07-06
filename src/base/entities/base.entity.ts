import { BaseEntity, Column, Entity } from "typeorm";

export class Base extends BaseEntity {
	id: number | string;

	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	createdAt: Date;

	@Column({ type: "timestamp", nullable: true, default: () => "CURRENT_TIMESTAMP" })
	updatedAt: Date;

	@Column({ type: "timestamp", nullable: true })
	deletedAt: Date;

	@Column({ type: "boolean", default: false })
	isDeleted: boolean;

	@Column({ type: "boolean", default: false })
	isActive: boolean;
}
