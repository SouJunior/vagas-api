import { config } from "dotenv";
config()
import { DataSource, DataSourceOptions } from "typeorm";
import "reflect-metadata"

const {
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
    port: +TYPEORM_PORT,
    username: TYPEORM_USERNAME,
    password: TYPEORM_PASSWORD,
    database: TYPEORM_DATABASE,
    entities: ['dist/database/entities/*.entity.js'],
    migrations: [
      'dist/database/migrations/*.js',
      'dist/database/migrations/seeds/*.js',
    ],
    ssl: {
      ca: CA_CERT,
      rejectUnauthorized: false,
    }
}

export const AppDataSource = new DataSource({
  ...typeormConfig
})