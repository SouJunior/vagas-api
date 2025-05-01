import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1746107506888 implements MigrationInterface {
    name = 'Migrations1746107506888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_3845b06bfda63ccc1da359b378" ON "tb_saved_jobs" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9bbd9a1f3bb4942f0471816b11" ON "tb_saved_jobs" ("jobId") `);
        await queryRunner.query(`ALTER TABLE "tb_saved_jobs" ADD CONSTRAINT "FK_9bbd9a1f3bb4942f0471816b111" FOREIGN KEY ("jobId") REFERENCES "tb_jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_saved_jobs" DROP CONSTRAINT "FK_9bbd9a1f3bb4942f0471816b111"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9bbd9a1f3bb4942f0471816b11"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3845b06bfda63ccc1da359b378"`);
    }

}
