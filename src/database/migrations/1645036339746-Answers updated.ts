import {MigrationInterface, QueryRunner} from "typeorm";

export class AnswersUpdated1645036339746 implements MigrationInterface {
    name = 'AnswersUpdated1645036339746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_b1510442bdce74b6d4da2458a42"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "REL_b1510442bdce74b6d4da2458a4"`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_b1510442bdce74b6d4da2458a42" FOREIGN KEY ("audit_id") REFERENCES "audits"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_b1510442bdce74b6d4da2458a42"`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "REL_b1510442bdce74b6d4da2458a4" UNIQUE ("audit_id")`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_b1510442bdce74b6d4da2458a42" FOREIGN KEY ("audit_id") REFERENCES "audits"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
