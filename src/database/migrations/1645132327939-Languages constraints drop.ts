import {MigrationInterface, QueryRunner} from "typeorm";

export class LanguagesConstraintsDrop1645132327939 implements MigrationInterface {
    name = 'LanguagesConstraintsDrop1645132327939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "evidences_placeholder" DROP CONSTRAINT "FK_1b3bbc40bbf8b5dc71ec20d13d1"`);
        await queryRunner.query(`ALTER TABLE "evidences_placeholder" DROP CONSTRAINT "REL_1b3bbc40bbf8b5dc71ec20d13d"`);
        await queryRunner.query(`ALTER TABLE "questions_desc" DROP CONSTRAINT "FK_6291c6a64d04d42aaf44ad3a5ec"`);
        await queryRunner.query(`ALTER TABLE "questions_desc" DROP CONSTRAINT "REL_6291c6a64d04d42aaf44ad3a5e"`);
        await queryRunner.query(`ALTER TABLE "topics" DROP CONSTRAINT "FK_118df244deb5f2cfde282c05186"`);
        await queryRunner.query(`ALTER TABLE "topics" DROP CONSTRAINT "REL_118df244deb5f2cfde282c0518"`);
        await queryRunner.query(`ALTER TABLE "evidences_placeholder" ADD CONSTRAINT "FK_1b3bbc40bbf8b5dc71ec20d13d1" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions_desc" ADD CONSTRAINT "FK_6291c6a64d04d42aaf44ad3a5ec" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topics" ADD CONSTRAINT "FK_118df244deb5f2cfde282c05186" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "topics" DROP CONSTRAINT "FK_118df244deb5f2cfde282c05186"`);
        await queryRunner.query(`ALTER TABLE "questions_desc" DROP CONSTRAINT "FK_6291c6a64d04d42aaf44ad3a5ec"`);
        await queryRunner.query(`ALTER TABLE "evidences_placeholder" DROP CONSTRAINT "FK_1b3bbc40bbf8b5dc71ec20d13d1"`);
        await queryRunner.query(`ALTER TABLE "topics" ADD CONSTRAINT "REL_118df244deb5f2cfde282c0518" UNIQUE ("language_id")`);
        await queryRunner.query(`ALTER TABLE "topics" ADD CONSTRAINT "FK_118df244deb5f2cfde282c05186" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions_desc" ADD CONSTRAINT "REL_6291c6a64d04d42aaf44ad3a5e" UNIQUE ("language_id")`);
        await queryRunner.query(`ALTER TABLE "questions_desc" ADD CONSTRAINT "FK_6291c6a64d04d42aaf44ad3a5ec" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "evidences_placeholder" ADD CONSTRAINT "REL_1b3bbc40bbf8b5dc71ec20d13d" UNIQUE ("language_id")`);
        await queryRunner.query(`ALTER TABLE "evidences_placeholder" ADD CONSTRAINT "FK_1b3bbc40bbf8b5dc71ec20d13d1" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
