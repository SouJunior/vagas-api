import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueEmailToCompanies1699999999999
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tb_companies" ADD CONSTRAINT "UQ_companies_email" UNIQUE ("email")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tb_companies" DROP CONSTRAINT "UQ_companies_email"`,
    );
  }
}
