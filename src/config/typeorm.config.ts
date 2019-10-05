import * as path from 'path';
import * as config from 'config';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: config.get('db.host') || process.env.DB_HOST,
      port: config.get('db.port'),
      username: config.get('db.username') || process.env.DB_USER,
      password: config.get('db.password') || process.env.DB_PASS,
      database: config.get('db.database') || process.env.DB_NAME,
      entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
      synchronize: config.get('db.synchronize'),
    };
  }
}
