import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createTableReport1663190020373 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    Promise.all([
      await queryRunner.createTable(
        new Table({
          name: 'report',
          columns: [
            {
              name: 'id',
              type: 'integer',
              isPrimary: true,
              isGenerated: true,
            },
            {
              name: 'job_id',
              type: 'integer',
              isNullable: false,
            },
            {
              name: 'user_id',
              type: 'integer',
              isNullable: false,
            },
            {
              name: 'description',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
          ],
        }),
      ),

      await queryRunner.createForeignKey(
        'report',
        new TableForeignKey({
          columnNames: ['job_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'jobs',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }),
      ),

      await queryRunner.createForeignKey(
        'report',
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
    await queryRunner.dropForeignKey('report', 'job_id');
    await queryRunner.dropForeignKey('report', 'user_id');
    await queryRunner.dropTable('report');
  }
}
