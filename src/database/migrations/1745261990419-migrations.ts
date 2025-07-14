import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1745261990419 implements MigrationInterface {
    name = 'Migrations1745261990419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_saved_jobs" DROP CONSTRAINT "FK_3845b06bfda63ccc1da359b378a"`);
        await queryRunner.query(`ALTER TABLE "tb_saved_jobs" ADD "expiresAt" TIMESTAMP NOT NULL DEFAULT now() + interval '7 days'`);
        await queryRunner.query(`ALTER TABLE "tb_saved_jobs" DROP COLUMN "jobId"`);
        await queryRunner.query(`ALTER TABLE "tb_saved_jobs" ADD "jobId" uuid`);
        await queryRunner.query(`ALTER TABLE "tb_saved_jobs" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_saved_jobs" ADD CONSTRAINT "FK_3845b06bfda63ccc1da359b378a" FOREIGN KEY ("userId") REFERENCES "tb_users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_saved_jobs" DROP CONSTRAINT "FK_3845b06bfda63ccc1da359b378a"`);
        await queryRunner.query(`ALTER TABLE "tb_saved_jobs" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_saved_jobs" DROP COLUMN "jobId"`);
        await queryRunner.query(`ALTER TABLE "tb_saved_jobs" ADD "jobId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_saved_jobs" DROP COLUMN "expiresAt"`);
        await queryRunner.query(`ALTER TABLE "tb_saved_jobs" ADD CONSTRAINT "FK_3845b06bfda63ccc1da359b378a" FOREIGN KEY ("userId") REFERENCES "tb_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
