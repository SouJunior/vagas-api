import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'reflect-metadata';

const {
  NODE_ENV,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_PASSWORD,
  TYPEORM_USERNAME,
  TYPEORM_DATABASE,
  CA_CERT,
} = process.env;

export const typeormConfig: DataSourceOptions = {
  type: 'postgres',
  host: TYPEORM_HOST,
  port: parseInt(TYPEORM_PORT),
  username: TYPEORM_USERNAME,
  password: TYPEORM_PASSWORD,
  database: TYPEORM_DATABASE,
  entities: [__dirname + '/entities/*.entity.{js,ts}'],
  migrations: [
    __dirname + '/migrations/*.{js,ts}',
    __dirname + '/migrations/seeds/*.{js,ts}',
  ],
  ssl:
    NODE_ENV == 'production'
      ? {
          ca: CA_CERT,
          rejectUnauthorized: false,
        }
      : undefined,
};

export const AppDataSource = new DataSource({
  ...typeormConfig,
});
