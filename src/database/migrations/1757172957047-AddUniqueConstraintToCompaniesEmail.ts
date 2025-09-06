import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueConstraintToCompaniesEmail1757172957047
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM tb_companies
      WHERE email IS NOT NULL 
        AND TRIM(email) != ''
        AND id NOT IN (
          SELECT MIN(id)
          FROM tb_companies
          WHERE email IS NOT NULL 
            AND TRIM(email) != ''
          GROUP BY LOWER(TRIM(email))
        )
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS UQ_companies_normalized_email 
      ON tb_companies (LOWER(TRIM(email)))
      WHERE email IS NOT NULL AND TRIM(email) != ''
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX CONCURRENTLY IF EXISTS UQ_companies_normalized_email
    `);
  }
}
