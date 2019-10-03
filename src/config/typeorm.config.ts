import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'tm_user',
      password: 'tm_pass',
      database: 'task_management',
      entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
      synchronize: true,
    };
  }
}
