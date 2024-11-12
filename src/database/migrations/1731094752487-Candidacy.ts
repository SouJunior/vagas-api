import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Candidacy1731094752487 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_candidacies',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'job_id',
            type: 'uuid',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['em andamento', 'encerrada', 'sem interesse'],
          },
          {
            name: 'date_candidacy',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'dateclosing',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'tb_candidacies',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedTableName: 'tb_users',
        referencedColumnNames: ['id'],
      }),
    );

    await queryRunner.createForeignKey(
      'tb_candidacies',
      new TableForeignKey({
        columnNames: ['job_id'],
        referencedTableName: 'tb_jobs',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('tb_candidacies');
    const foreignKeys = table.foreignKeys.filter(
      (fk) =>
        fk.columnNames.indexOf('user_id') !== -1 ||
        fk.columnNames.indexOf('job_id') !== -1,
    );
    await queryRunner.dropForeignKeys('tb_candidacies', foreignKeys);
    await queryRunner.dropTable('tb_candidacies');
  }
}
