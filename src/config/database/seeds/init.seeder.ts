import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager, runSeeders } from "typeorm-extension";
import UserSeeder from "./seeders/user.seeder";
import { roleFactory, userFactory } from "./factories";
import RoleSeeder from "./seeders/role.seeder";

export default class InitSeeder implements Seeder {
	async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
		await runSeeders(dataSource, {
			seeds: [
				RoleSeeder,
				UserSeeder,
			],
			factories: [
				roleFactory,
				userFactory,
			]
		})
	}

}