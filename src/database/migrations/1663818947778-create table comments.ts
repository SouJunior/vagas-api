import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createTableComments1663818947778 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    Promise.all([
      await queryRunner.createTable(
        new Table({
          name: 'comments',
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
              name: 'comment',
              type: 'varchar',
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
            {
              name: 'desativated_at',
              type: 'timestamp',
              isNullable: true,
            },
          ],
        }),
      ),

      await queryRunner.createForeignKey(
        'comments',
        new TableForeignKey({
          columnNames: ['job_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'jobs',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }),
      ),

      await queryRunner.createForeignKey(
        'comments',
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
    await queryRunner.dropForeignKey('comments', 'job_id');
    await queryRunner.dropForeignKey('comments', 'user_id');
    await queryRunner.dropTable('comments');
  }
}
