import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateSchema1662071635898 implements MigrationInterface {
    name = 'CreateSchema1662071635898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "forms" ("id" SERIAL NOT NULL, "form_number" character varying NOT NULL, CONSTRAINT "UQ_8f72f7868b2eaf6a6c2f015bfac" UNIQUE ("form_number"), CONSTRAINT "PK_ba062fd30b06814a60756f233da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_type_enum" AS ENUM('auditor', 'manager')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "pw_hash" character varying NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "occupation_role" character varying NOT NULL, "type" "public"."users_type_enum" NOT NULL DEFAULT 'auditor', "avatar_url" character varying, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."audits_type_enum" AS ENUM('internal', 'external')`);
        await queryRunner.query(`CREATE TABLE "audits" ("id" SERIAL NOT NULL, "name_institution" character varying NOT NULL, "email_institution" character varying NOT NULL, "phone_institution" character varying NOT NULL, "country_institution" character varying NOT NULL, "city_institution" character varying NOT NULL, "address_institution" character varying NOT NULL, "type" "public"."audits_type_enum" NOT NULL DEFAULT 'internal', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_b2d7a2089999197dc7024820f28" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "evidences" ("id" SERIAL NOT NULL, "link" character varying NOT NULL, CONSTRAINT "PK_bffc6fa8c23f9fd2e2a6d165d45" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "languages" ("id" SERIAL NOT NULL, "shortname" character varying(5) NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_4ec168f0d1926264d0bc015b040" UNIQUE ("shortname"), CONSTRAINT "PK_b517f827ca496b29f4d549c631d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "evidences_placeholder" ("id" SERIAL NOT NULL, "placeholder" character varying NOT NULL, "question_id" integer, "language_id" integer, CONSTRAINT "PK_3eea888cc528bd1b14ad2446d99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questions_desc" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "question_id" integer, "language_id" integer, CONSTRAINT "PK_7c9f3f10c22b0544e632f3c7005" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "topics" ("id" SERIAL NOT NULL, "topic" character varying NOT NULL, "question_id" integer, "language_id" integer, CONSTRAINT "PK_e4aa99a3fa60ec3a37d1fc4e853" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questions" ("id" SERIAL NOT NULL, "question_number" character varying NOT NULL, "form_id" integer, CONSTRAINT "UQ_47e3af78a253db8d4bb38ed6b7c" UNIQUE ("question_number"), CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."answers_conformance_level_enum" AS ENUM('NA', '0', '1', '2', '3', '4')`);
        await queryRunner.query(`CREATE TYPE "public"."answers_nc_priority_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TABLE "answers" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "conformance_level" "public"."answers_conformance_level_enum" NOT NULL DEFAULT 'NA', "nc_priority" "public"."answers_nc_priority_enum", "comment" text NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "user_id" integer, "audit_id" integer, "question_id" integer, CONSTRAINT "UQ_f57aa3afde1e7e17332a791b2f9" UNIQUE ("user_id", "audit_id", "question_id"), CONSTRAINT "PK_9c32cec6c71e06da0254f2226c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "names" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "form_id" integer, "language_id" integer, CONSTRAINT "PK_d2e97a54ee33765c4d2ff2b8c79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "audits_users" ("user_id" integer NOT NULL, "audit_id" integer NOT NULL, CONSTRAINT "PK_e9c60a2b921d4305e3de3c3f04a" PRIMARY KEY ("user_id", "audit_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4372ad5c2512745dffc6a84f8f" ON "audits_users" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f92a09b163937be192311ad05a" ON "audits_users" ("audit_id") `);
        await queryRunner.query(`CREATE TABLE "audits_forms" ("audit_id" integer NOT NULL, "form_id" integer NOT NULL, CONSTRAINT "PK_7c628f118a5cce9ea74c86cc72f" PRIMARY KEY ("audit_id", "form_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7d0d403c389006b2cbc1c97bba" ON "audits_forms" ("audit_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f2fa95533c1ff6187b92676e63" ON "audits_forms" ("form_id") `);
        await queryRunner.query(`CREATE TABLE "answers_evidences" ("answer_id" integer NOT NULL, "evidence_id" integer NOT NULL, CONSTRAINT "PK_c8f84b97148035f93a1756baaba" PRIMARY KEY ("answer_id", "evidence_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6212769db7311d1d7e27d4416f" ON "answers_evidences" ("answer_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_29dc896b87e5b713751dd08e57" ON "answers_evidences" ("evidence_id") `);
        await queryRunner.query(`ALTER TABLE "evidences_placeholder" ADD CONSTRAINT "FK_47fb23f0fca1fcbc57299f49815" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "evidences_placeholder" ADD CONSTRAINT "FK_1b3bbc40bbf8b5dc71ec20d13d1" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions_desc" ADD CONSTRAINT "FK_5768e64b5a08f894506b71c713a" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions_desc" ADD CONSTRAINT "FK_6291c6a64d04d42aaf44ad3a5ec" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topics" ADD CONSTRAINT "FK_0e924dce9cccd4ee0df582d1471" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topics" ADD CONSTRAINT "FK_118df244deb5f2cfde282c05186" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_a40e5497291ddbe799af622efa9" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_f4cf663ebeca05b7a12f6a2cc97" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_b1510442bdce74b6d4da2458a42" FOREIGN KEY ("audit_id") REFERENCES "audits"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_677120094cf6d3f12df0b9dc5d3" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "names" ADD CONSTRAINT "FK_baf8e1e1099c088d5c5871f6278" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "names" ADD CONSTRAINT "FK_62cfe100d7c2d279f528bb56805" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "audits_users" ADD CONSTRAINT "FK_4372ad5c2512745dffc6a84f8f0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "audits_users" ADD CONSTRAINT "FK_f92a09b163937be192311ad05ad" FOREIGN KEY ("audit_id") REFERENCES "audits"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "audits_forms" ADD CONSTRAINT "FK_7d0d403c389006b2cbc1c97bba0" FOREIGN KEY ("audit_id") REFERENCES "audits"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "audits_forms" ADD CONSTRAINT "FK_f2fa95533c1ff6187b92676e63f" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers_evidences" ADD CONSTRAINT "FK_6212769db7311d1d7e27d4416f1" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "answers_evidences" ADD CONSTRAINT "FK_29dc896b87e5b713751dd08e572" FOREIGN KEY ("evidence_id") REFERENCES "evidences"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers_evidences" DROP CONSTRAINT "FK_29dc896b87e5b713751dd08e572"`);
        await queryRunner.query(`ALTER TABLE "answers_evidences" DROP CONSTRAINT "FK_6212769db7311d1d7e27d4416f1"`);
        await queryRunner.query(`ALTER TABLE "audits_forms" DROP CONSTRAINT "FK_f2fa95533c1ff6187b92676e63f"`);
        await queryRunner.query(`ALTER TABLE "audits_forms" DROP CONSTRAINT "FK_7d0d403c389006b2cbc1c97bba0"`);
        await queryRunner.query(`ALTER TABLE "audits_users" DROP CONSTRAINT "FK_f92a09b163937be192311ad05ad"`);
        await queryRunner.query(`ALTER TABLE "audits_users" DROP CONSTRAINT "FK_4372ad5c2512745dffc6a84f8f0"`);
        await queryRunner.query(`ALTER TABLE "names" DROP CONSTRAINT "FK_62cfe100d7c2d279f528bb56805"`);
        await queryRunner.query(`ALTER TABLE "names" DROP CONSTRAINT "FK_baf8e1e1099c088d5c5871f6278"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_677120094cf6d3f12df0b9dc5d3"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_b1510442bdce74b6d4da2458a42"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_f4cf663ebeca05b7a12f6a2cc97"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_a40e5497291ddbe799af622efa9"`);
        await queryRunner.query(`ALTER TABLE "topics" DROP CONSTRAINT "FK_118df244deb5f2cfde282c05186"`);
        await queryRunner.query(`ALTER TABLE "topics" DROP CONSTRAINT "FK_0e924dce9cccd4ee0df582d1471"`);
        await queryRunner.query(`ALTER TABLE "questions_desc" DROP CONSTRAINT "FK_6291c6a64d04d42aaf44ad3a5ec"`);
        await queryRunner.query(`ALTER TABLE "questions_desc" DROP CONSTRAINT "FK_5768e64b5a08f894506b71c713a"`);
        await queryRunner.query(`ALTER TABLE "evidences_placeholder" DROP CONSTRAINT "FK_1b3bbc40bbf8b5dc71ec20d13d1"`);
        await queryRunner.query(`ALTER TABLE "evidences_placeholder" DROP CONSTRAINT "FK_47fb23f0fca1fcbc57299f49815"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_29dc896b87e5b713751dd08e57"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6212769db7311d1d7e27d4416f"`);
        await queryRunner.query(`DROP TABLE "answers_evidences"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f2fa95533c1ff6187b92676e63"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7d0d403c389006b2cbc1c97bba"`);
        await queryRunner.query(`DROP TABLE "audits_forms"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f92a09b163937be192311ad05a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4372ad5c2512745dffc6a84f8f"`);
        await queryRunner.query(`DROP TABLE "audits_users"`);
        await queryRunner.query(`DROP TABLE "names"`);
        await queryRunner.query(`DROP TABLE "answers"`);
        await queryRunner.query(`DROP TYPE "public"."answers_nc_priority_enum"`);
        await queryRunner.query(`DROP TYPE "public"."answers_conformance_level_enum"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TABLE "topics"`);
        await queryRunner.query(`DROP TABLE "questions_desc"`);
        await queryRunner.query(`DROP TABLE "evidences_placeholder"`);
        await queryRunner.query(`DROP TABLE "languages"`);
        await queryRunner.query(`DROP TABLE "evidences"`);
        await queryRunner.query(`DROP TABLE "audits"`);
        await queryRunner.query(`DROP TYPE "public"."audits_type_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_type_enum"`);
        await queryRunner.query(`DROP TABLE "forms"`);
    }

}
