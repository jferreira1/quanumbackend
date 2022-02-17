import {MigrationInterface, QueryRunner} from "typeorm";

export class revert1645035133139 implements MigrationInterface {
    name = 'revert1645035133139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "answers" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "conformance_level" "public"."answers_conformance_level_enum" NOT NULL DEFAULT 'NA', "comment" text NOT NULL, "user_id" integer, "audit_id" integer, "question_id" integer, CONSTRAINT "REL_b1510442bdce74b6d4da2458a4" UNIQUE ("audit_id"), CONSTRAINT "PK_9c32cec6c71e06da0254f2226c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_f4cf663ebeca05b7a12f6a2cc97" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_b1510442bdce74b6d4da2458a42" FOREIGN KEY ("audit_id") REFERENCES "audits"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_677120094cf6d3f12df0b9dc5d3" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers_evidences" ADD CONSTRAINT "FK_6212769db7311d1d7e27d4416f1" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers_evidences" DROP CONSTRAINT "FK_6212769db7311d1d7e27d4416f1"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_677120094cf6d3f12df0b9dc5d3"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_b1510442bdce74b6d4da2458a42"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_f4cf663ebeca05b7a12f6a2cc97"`);
        await queryRunner.query(`DROP TABLE "answers"`);
    }

}
