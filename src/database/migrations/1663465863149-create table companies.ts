import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createTableCompanies1663465863149 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    Promise.all([
      await queryRunner.createTable(
        new Table({
          name: 'companies',
          columns: [
            {
              name: 'id',
              type: 'integer',
              isPrimary: true,
              isGenerated: true,
            },
            {
              name: 'company_name',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'email',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'linkedin',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'description',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'address',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'owner_name',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'owner_phone',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'user_id',
              type: 'integer',
              isNullable: false,
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
          ],
        }),
      ),

      await queryRunner.createForeignKey(
        'companies',
        new TableForeignKey({
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }),
      ),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('companies', 'user_id');
    await queryRunner.dropTable('companies');
  }
}
