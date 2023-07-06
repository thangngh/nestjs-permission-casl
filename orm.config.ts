import InitSeeder from '@config/database/seeds/init.seeder';
import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD.toString(),
	database: process.env.DB_NAME,
	logging: true,
	synchronize: true,
	entities: ['src/**/**.entity{.ts,.js}'],
	migrations: ['dist/src/config/database/migrations/*.js'],
	seeds: [InitSeeder],
};

export default new DataSource(options);