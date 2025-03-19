import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSavedJobs1742424807961 implements MigrationInterface {
    name = 'CreateSavedJobs1742424807961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_alerts" DROP CONSTRAINT "FK_a60dd357707a39803ce4cfbd90b"`);
        await queryRunner.query(`CREATE TABLE "tb_saved_jobs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_b69821433d55c7266698911ead6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_users_saved_jobs_tb_saved_jobs" ("tbUsersId" uuid NOT NULL, "tbSavedJobsId" uuid NOT NULL, CONSTRAINT "PK_559356d64d48f9914bba2b4174c" PRIMARY KEY ("tbUsersId", "tbSavedJobsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5f854b199f5fd3d8c8d3ed3bf8" ON "tb_users_saved_jobs_tb_saved_jobs" ("tbUsersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_71b864cabf247bcfa6d033dc59" ON "tb_users_saved_jobs_tb_saved_jobs" ("tbSavedJobsId") `);
        await queryRunner.query(`ALTER TABLE "tb_candidacies" DROP COLUMN "date_candidacy"`);
        await queryRunner.query(`ALTER TABLE "tb_candidacies" ADD "date_candidacy" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tb_certifications" ADD CONSTRAINT "FK_75f15015611ef7f444ae3fade23" FOREIGN KEY ("personal_data_id") REFERENCES "tb_personal_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_courses" ADD CONSTRAINT "FK_beb3c749f9d5000af64c4442989" FOREIGN KEY ("personal_data_id") REFERENCES "tb_personal_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_languages" ADD CONSTRAINT "FK_ecd946bdf16c31509a966a5002f" FOREIGN KEY ("personal_data_id") REFERENCES "tb_personal_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_work_experiences" ADD CONSTRAINT "FK_e668e3b05cc240131e27a41e5b5" FOREIGN KEY ("personal_data_id") REFERENCES "tb_personal_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_users" ADD CONSTRAINT "FK_0afe3b230cbd95a08c72f9df3f0" FOREIGN KEY ("personalDataId") REFERENCES "tb_personal_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_curriculum" ADD CONSTRAINT "FK_2c53580e4d1f616f6ffee74ba51" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_applications" ADD CONSTRAINT "FK_1408b5e5220c7d0fe25573cb3b9" FOREIGN KEY ("job_id") REFERENCES "tb_jobs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_applications" ADD CONSTRAINT "FK_08c82d5bde7b75b17f54460adda" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_applications" ADD CONSTRAINT "FK_f3502a850c1b2b75a5dbe2c04ee" FOREIGN KEY ("curriculum_id") REFERENCES "tb_curriculum"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_comments" ADD CONSTRAINT "FK_b7d6e83dbfa5e98148529803894" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_comments" ADD CONSTRAINT "FK_d4e57c6e48ba93300dc02734659" FOREIGN KEY ("job_id") REFERENCES "tb_jobs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_jobs" ADD CONSTRAINT "FK_a64a855331c54d698baddb03b6f" FOREIGN KEY ("company_id") REFERENCES "tb_companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_reports" ADD CONSTRAINT "FK_c95aa2c975cb6369772d5f15c7d" FOREIGN KEY ("job_id") REFERENCES "tb_jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_reports" ADD CONSTRAINT "FK_86d265112a095a1daae2e34d669" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_alerts" ADD CONSTRAINT "FK_a60dd357707a39803ce4cfbd90b" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_users_saved_jobs_tb_saved_jobs" ADD CONSTRAINT "FK_5f854b199f5fd3d8c8d3ed3bf86" FOREIGN KEY ("tbUsersId") REFERENCES "tb_users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_users_saved_jobs_tb_saved_jobs" ADD CONSTRAINT "FK_71b864cabf247bcfa6d033dc599" FOREIGN KEY ("tbSavedJobsId") REFERENCES "tb_saved_jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_users_saved_jobs_tb_saved_jobs" DROP CONSTRAINT "FK_71b864cabf247bcfa6d033dc599"`);
        await queryRunner.query(`ALTER TABLE "tb_users_saved_jobs_tb_saved_jobs" DROP CONSTRAINT "FK_5f854b199f5fd3d8c8d3ed3bf86"`);
        await queryRunner.query(`ALTER TABLE "tb_alerts" DROP CONSTRAINT "FK_a60dd357707a39803ce4cfbd90b"`);
        await queryRunner.query(`ALTER TABLE "tb_reports" DROP CONSTRAINT "FK_86d265112a095a1daae2e34d669"`);
        await queryRunner.query(`ALTER TABLE "tb_reports" DROP CONSTRAINT "FK_c95aa2c975cb6369772d5f15c7d"`);
        await queryRunner.query(`ALTER TABLE "tb_jobs" DROP CONSTRAINT "FK_a64a855331c54d698baddb03b6f"`);
        await queryRunner.query(`ALTER TABLE "tb_comments" DROP CONSTRAINT "FK_d4e57c6e48ba93300dc02734659"`);
        await queryRunner.query(`ALTER TABLE "tb_comments" DROP CONSTRAINT "FK_b7d6e83dbfa5e98148529803894"`);
        await queryRunner.query(`ALTER TABLE "tb_applications" DROP CONSTRAINT "FK_f3502a850c1b2b75a5dbe2c04ee"`);
        await queryRunner.query(`ALTER TABLE "tb_applications" DROP CONSTRAINT "FK_08c82d5bde7b75b17f54460adda"`);
        await queryRunner.query(`ALTER TABLE "tb_applications" DROP CONSTRAINT "FK_1408b5e5220c7d0fe25573cb3b9"`);
        await queryRunner.query(`ALTER TABLE "tb_curriculum" DROP CONSTRAINT "FK_2c53580e4d1f616f6ffee74ba51"`);
        await queryRunner.query(`ALTER TABLE "tb_users" DROP CONSTRAINT "FK_0afe3b230cbd95a08c72f9df3f0"`);
        await queryRunner.query(`ALTER TABLE "tb_work_experiences" DROP CONSTRAINT "FK_e668e3b05cc240131e27a41e5b5"`);
        await queryRunner.query(`ALTER TABLE "tb_languages" DROP CONSTRAINT "FK_ecd946bdf16c31509a966a5002f"`);
        await queryRunner.query(`ALTER TABLE "tb_courses" DROP CONSTRAINT "FK_beb3c749f9d5000af64c4442989"`);
        await queryRunner.query(`ALTER TABLE "tb_certifications" DROP CONSTRAINT "FK_75f15015611ef7f444ae3fade23"`);
        await queryRunner.query(`ALTER TABLE "tb_candidacies" DROP COLUMN "date_candidacy"`);
        await queryRunner.query(`ALTER TABLE "tb_candidacies" ADD "date_candidacy" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`DROP INDEX "public"."IDX_71b864cabf247bcfa6d033dc59"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5f854b199f5fd3d8c8d3ed3bf8"`);
        await queryRunner.query(`DROP TABLE "tb_users_saved_jobs_tb_saved_jobs"`);
        await queryRunner.query(`DROP TABLE "tb_saved_jobs"`);
        await queryRunner.query(`ALTER TABLE "tb_alerts" ADD CONSTRAINT "FK_a60dd357707a39803ce4cfbd90b" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
