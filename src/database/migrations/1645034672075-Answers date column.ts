import {MigrationInterface, QueryRunner} from "typeorm";

export class AnswersDateColumn1645034672075 implements MigrationInterface {
    name = 'AnswersDateColumn1645034672075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "answers" ADD "audit_id" integer`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "UQ_b1510442bdce74b6d4da2458a42" UNIQUE ("audit_id")`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_b1510442bdce74b6d4da2458a42" FOREIGN KEY ("audit_id") REFERENCES "audits"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_b1510442bdce74b6d4da2458a42"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "UQ_b1510442bdce74b6d4da2458a42"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP COLUMN "audit_id"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP COLUMN "created_at"`);
    }

}
