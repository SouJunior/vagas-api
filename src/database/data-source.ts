import { DataSource, DataSourceOptions } from "typeorm";
import "reflect-metadata"
import { config } from "dotenv";
config()

const {
    ISLOCAL,
    TYPEORM_HOST,
    TYPEORM_PORT,
    TYPEORM_PASSWORD,
    TYPEORM_USERNAME,
    TYPEORM_DATABASE,
    TYPEORM_DOCKER_HOST,
    TYPEORM_DOCKER_PORT,
    TYPEORM_DOCKER_USERNAME,
    TYPEORM_DOCKER_PASSWORD,
    TYPEORM_DOCKER_DATABASE,
  } = process.env;

export const typeormConfig: DataSourceOptions = {
    type: 'postgres',
    host: ISLOCAL == 'true' ? TYPEORM_DOCKER_HOST : TYPEORM_HOST,
    port: ISLOCAL == 'true' ? +TYPEORM_DOCKER_PORT : +TYPEORM_PORT,
    username: ISLOCAL == 'true' ? TYPEORM_DOCKER_USERNAME : TYPEORM_USERNAME,
    password: ISLOCAL == 'true' ? TYPEORM_DOCKER_PASSWORD : TYPEORM_PASSWORD,
    database: ISLOCAL == 'true' ? TYPEORM_DOCKER_DATABASE : TYPEORM_DATABASE,
    migrationsRun: true,
    entities: ['dist/database/entities/*.entity.js'],
    migrations: [
      'dist/database/migrations/*.js',
      'dist/database/migrations/seeds/*.js',
    ],
}

export const AppDataSource = new DataSource({
  ...typeormConfig
})