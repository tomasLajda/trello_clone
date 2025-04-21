import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Role } from './role.entity.js';
import { User } from './user.entity.js';

export const appDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  entities: [User, Role],
  synchronize: true,
  logging: true,
  subscribers: [],
  migrations: [],
});

export const userRepository = appDataSource.getRepository(User);
export const roleRepository = appDataSource.getRepository(Role);
