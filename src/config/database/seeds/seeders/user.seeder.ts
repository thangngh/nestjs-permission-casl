import { ERole } from '@base/base.interface';
import { User } from '@models/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
	async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
		const userRepository = dataSource.getRepository(User);

		const data = {
			userName: 'admin',
			password: '$2b$10$uTSddmy1TDEPH7kSKHJmg.56JCJgM3Y2EIpptwRiBmnDPehQcG7fu',
			firstName: 'admin',
		};

		const findUser = await userRepository.findOneBy({
			userName: data.userName,
		});

		!findUser && await userRepository.insert([
			{
				userName: data.userName,
				password: data.password,
				firstName: data.firstName,
				roleId: ERole['ADMIN']
			},
		]);
	}

}