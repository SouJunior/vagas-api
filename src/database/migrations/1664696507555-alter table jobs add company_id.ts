import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class alterTableJobsAddCompanyId1664696507555
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    Promise.all([
      await queryRunner.addColumn(
        'jobs',
        new TableColumn({
          name: 'company_id',
          type: 'integer',
          isNullable: false,
        }),
      ),

      await queryRunner.createForeignKey(
        'jobs',
        new TableForeignKey({
          columnNames: ['company_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'companies',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }),
      ),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('jobs', 'company_id');
    await queryRunner.dropColumn('jobs', 'company_id');
  }
}
