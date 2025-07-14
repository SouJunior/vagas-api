import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1745267234389 implements MigrationInterface {
    name = 'Migrations1745267234389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_saved_jobs" ALTER COLUMN "expiresAt" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_saved_jobs" ALTER COLUMN "expiresAt" SET DEFAULT now()`);
    }

}
