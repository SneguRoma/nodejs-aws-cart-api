import * as dotenv from 'dotenv';

dotenv.config();

export const databaseConfig = {
    host: process.env.DB_HOST || 'bakerydb.czuueys6ip67.eu-west-1.rds.amazonaws.com',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'bakeryDb',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
  };