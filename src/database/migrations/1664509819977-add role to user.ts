import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addRoleToUser1664509819977 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'type',
        type: 'enum',
        enum: ['ADMIN', 'USER'],
        default: `'USER'`,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'type');
  }
}
