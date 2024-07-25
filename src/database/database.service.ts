import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { databaseConfig } from '../database.config';

@Injectable()
export class DatabaseService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool(databaseConfig);
  }

  async query(text: string, params?: any[]) {
    const client = await this.pool.connect();
    try {
      return await client.query(text, params);
    } finally {
      client.release();
    }
  }
}