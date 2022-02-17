import {MigrationInterface, QueryRunner} from "typeorm";

export class AnswersUpdatedd1645037535508 implements MigrationInterface {
    name = 'AnswersUpdatedd1645037535508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "UQ_f57aa3afde1e7e17332a791b2f9" UNIQUE ("user_id", "audit_id", "question_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "UQ_f57aa3afde1e7e17332a791b2f9"`);
    }

}
