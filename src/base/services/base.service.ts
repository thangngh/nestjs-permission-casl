import { Base } from "@base/entities/base.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseEntity, Repository } from "typeorm";

type Join = {
	entity: string;
	column: string;
};

@Injectable()
export class BaseService<T extends BaseEntity, U = any> {
	constructor(private readonly repository?: Repository<T | U>, ...args: any[]) { }

	// findWithMultipleJoins(joins: Join[]): Promise<T[]> {
	// 	const queryBuilder = this.repository.createQueryBuilder('T');

	// 	joins.forEach(({ entity, column }) => {
	// 		queryBuilder.leftJoinAndSelect(entity, column);
	// 	});

	// 	return queryBuilder.getMany();
	// }

	// async create(data: any): Promise<T> {

	// }

	findById(id: any): Promise<T | U> {
		return this.repository.findOne(id);
	}
}