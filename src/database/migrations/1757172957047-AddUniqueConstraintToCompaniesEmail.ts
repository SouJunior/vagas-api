import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueConstraintToCompaniesEmail1757172957047
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM tb_companies
      WHERE id NOT IN (
        SELECT MIN(id)
        FROM tb_companies
        GROUP BY LOWER(TRIM(email))
      )
    `);

    await queryRunner.query(`
      ALTER TABLE tb_companies 
      ADD CONSTRAINT UQ_companies_email 
      UNIQUE (email)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE tb_companies 
      DROP CONSTRAINT UQ_companies_email
    `);
  }
}
