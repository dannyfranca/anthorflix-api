import { readdirSync, readFileSync } from 'fs';
import { fork } from 'child_process';
import { join } from 'path';
import { v4 } from 'uuid';
import { Client } from 'pg';

import { PrismaService } from './prisma.service';

const baseUrl =
  process.env.TEST_BASE_URL ?? 'postgres://postgres:postgres@localhost:5432/';

export class PrismaTestController {
  public prisma: PrismaService;
  public databaseName: string;
  public pg: Client;

  constructor() {
    this.generateRandomDatabaseName();
    this.generateInstance();
  }

  get url() {
    return baseUrl + this.databaseName;
  }

  async init() {
    this.generateRandomDatabaseName();
    await this.migrate();
    this.generateInstance();
    await this.prisma.$connect();
  }

  async destroy() {
    if (!this.prisma || !this.url) return;
    await this.prisma.$disconnect();
    await this.dropDatabase();
  }

  async migrate() {
    await this.createDatabase();

    const child = fork(
      join(process.cwd(), 'node_modules/prisma/build/index.js'),
      [
        'migrate',
        'deploy',
        '--schema',
        join(process.cwd(), 'prisma/schema.prisma'),
      ],
      {
        env: {
          DATABASE_URL: this.url,
        },
      },
    );

    return new Promise((resolve, reject) => {
      child.on('message', (message) => console.log(message));
      child.on('exit', resolve);
      child.on('error', reject);
    });
  }

  private async quickQuery(query: string) {
    const client = new Client({ connectionString: baseUrl + 'postgres' });
    await client.connect();
    await client.query(query);
    await client.end();
  }

  private async createDatabase() {
    await this.quickQuery('CREATE DATABASE ' + this.databaseName);
  }

  private async dropDatabase() {
    await this.quickQuery('DROP DATABASE ' + this.databaseName);
  }

  private generateRandomDatabaseName() {
    this.databaseName = '_test_' + v4().replace(/-/g, '');
  }

  private generateInstance() {
    this.prisma = new PrismaService({
      datasources: {
        db: {
          url: this.url,
        },
      },
    });
  }
}
