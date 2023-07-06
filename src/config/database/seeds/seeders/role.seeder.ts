import { Role } from "@models/role";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export default class RoleSeeder implements Seeder {
	async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
		const roleRepository = dataSource.getRepository(Role);

		const data = ["ADMIN", "USER", "GUEST"];

		for (const roleName of data) {
			const trimRoleName = roleName.trim().toLocaleLowerCase()
			const findRole = await roleRepository.findOneBy({
				roleName: trimRoleName,
			});

			!findRole && await roleRepository.insert({
				roleName: trimRoleName,
			});
		}
	}
}