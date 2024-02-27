import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1709060138221 implements MigrationInterface {
    name = 'Migrations1709060138221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."tb_jobs_modality_enum" RENAME TO "tb_jobs_modality_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."tb_jobs_modality_enum" AS ENUM('HYBRID', 'ON_SITE', 'REMOTE')`);
        await queryRunner.query(`ALTER TABLE "tb_jobs" ALTER COLUMN "modality" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tb_jobs" ALTER COLUMN "modality" TYPE "public"."tb_jobs_modality_enum" USING "modality"::"text"::"public"."tb_jobs_modality_enum"`);
        await queryRunner.query(`ALTER TABLE "tb_jobs" ALTER COLUMN "modality" SET DEFAULT 'REMOTE'`);
        await queryRunner.query(`DROP TYPE "public"."tb_jobs_modality_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tb_jobs_modality_enum_old" AS ENUM('HYBRID', 'IN_PERSON', 'REMOTE')`);
        await queryRunner.query(`ALTER TABLE "tb_jobs" ALTER COLUMN "modality" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tb_jobs" ALTER COLUMN "modality" TYPE "public"."tb_jobs_modality_enum_old" USING "modality"::"text"::"public"."tb_jobs_modality_enum_old"`);
        await queryRunner.query(`ALTER TABLE "tb_jobs" ALTER COLUMN "modality" SET DEFAULT 'REMOTE'`);
        await queryRunner.query(`DROP TYPE "public"."tb_jobs_modality_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."tb_jobs_modality_enum_old" RENAME TO "tb_jobs_modality_enum"`);
    }

}
