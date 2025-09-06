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
  DB_TYPE,
  DB_DATABASE,
  DB_SYNCHRONIZE,
  DB_SSL_REJECT_UNAUTHORIZED,
} = process.env;

const normalizeCACert = (caCert: string | undefined): string | undefined => {
  if (!caCert || caCert.trim() === '') return undefined;
  return caCert.replace(/\\n/g, '\n');
};

const validateDatabasePort = (
  portString: string | undefined,
  defaultPort = 5432,
): number => {
  if (portString === undefined) return defaultPort;

  const trimmed = portString.trim();
  if (trimmed.length === 0 || !/^\d+$/.test(trimmed)) {
    throw new TypeError(
      `Invalid database port: "${portString}". Port must be an integer between 1 and 65535.`,
    );
  }

  const port = Number(trimmed);
  if (port < 1 || port > 65535) {
    throw new RangeError(
      `Invalid database port: ${port}. Port must be between 1 and 65535.`,
    );
  }

  return port;
};

const validatePostgreSQLEnvironment = (): void => {
  const requiredVars = [
    'TYPEORM_HOST',
    'TYPEORM_USERNAME',
    'TYPEORM_PASSWORD',
    'TYPEORM_DATABASE',
  ];

  const missingVars = requiredVars.filter((varName) => {
    const value = process.env[varName];
    return !value || value.trim() === '';
  });

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required PostgreSQL environment variables: ${missingVars.join(', ')}. ` +
        'Please set these variables before starting the application.',
    );
  }
};

const createSSLConfig = () => {
  if (NODE_ENV !== 'production') return undefined;

  const normalizedCACert = normalizeCACert(CA_CERT);
  if (!normalizedCACert) return undefined;

  const rejectUnauthorized =
    DB_SSL_REJECT_UNAUTHORIZED === 'false' || DB_SSL_REJECT_UNAUTHORIZED === '0'
      ? false
      : true;

  if (!rejectUnauthorized) {
    console.warn(
      '⚠️  WARNING: Database SSL is configured with rejectUnauthorized: false. ' +
        'This setting bypasses certificate validation and should only be used in development. ' +
        'Set DB_SSL_REJECT_UNAUTHORIZED=true or remove this environment variable for secure production deployment.',
    );
  }

  return {
    ca: normalizedCACert,
    rejectUnauthorized,
  };
};

const isTestEnvironment = DB_TYPE === 'sqlite' && DB_DATABASE === ':memory:';

if (!isTestEnvironment) {
  validatePostgreSQLEnvironment();
}

export const typeormConfig: DataSourceOptions = isTestEnvironment
  ? {
      type: 'sqlite',
      database: ':memory:',
      entities: ['src/database/entities/*.entity.ts'],
      synchronize: DB_SYNCHRONIZE === 'true',
      dropSchema: true,
    }
  : {
      type: 'postgres',
      host: TYPEORM_HOST,
      port: validateDatabasePort(TYPEORM_PORT),
      username: TYPEORM_USERNAME,
      password: TYPEORM_PASSWORD,
      database: TYPEORM_DATABASE,
      entities: ['dist/database/entities/*.entity.js'],
      migrations: [
        'dist/database/migrations/*.js',
        'dist/database/migrations/seeds/*.js',
      ],
      ssl: createSSLConfig(),
    };

export const AppDataSource = new DataSource({
  ...typeormConfig,
});
