import { MigrationInterface, QueryRunner } from 'typeorm';

import { AppSeedDataSource } from '../config/orm-config-seed';
import { useCatch } from '../../utils/use-catch';
import { Role } from '../../../models/Role';
import { User } from '../../../models/User';
import { generateUUID } from '../../utils/commons/generate-uuid';

export class Seeds1590519635401 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const driver = AppSeedDataSource;

    const [_errorR, _role] = await useCatch(
      driver
        .createQueryBuilder()
        .insert()
        .into(Role)
        .values([
          { name: 'MANAGER', description: 'Manager role' },
          { name: 'USER', description: 'User role' },
        ])
        .execute(),
    );
    if (_errorR) {
      throw _errorR;
    }
    console.log('\x1b[32m%s\x1b[0m', '**** Roles seed finish ****');

    const [_error, _users] = await useCatch(
      driver
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            uuid: generateUUID(),
            email: 'manager@gmail.com',
            username: 'manager-username',
            fullName: 'Manager full name',
            roleId: 1,
          },
          {
            uuid: generateUUID(),
            email: 'user@gmail.com',
            username: 'user-username',
            fullName: 'User full name',
            roleId: 2,
          },
        ])
        .execute(),
    );
    if (_error) {
      throw _error;
    }
    console.log('\x1b[32m%s\x1b[0m', '**** Users seed finish ****');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    console.log('Not implemented');
  }
}
