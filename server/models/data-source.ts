import 'dotenv/config';
import { DataSource } from 'typeorm';

export const myDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  entities: ['./*.js'],
  synchronize: true,
  logging: true,
});
