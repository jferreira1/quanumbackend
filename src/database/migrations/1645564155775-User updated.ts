import {MigrationInterface, QueryRunner} from "typeorm";

export class UserUpdated1645564155775 implements MigrationInterface {
    name = 'UserUpdated1645564155775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "type_of" TO "type"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "type" "public"."users_type_enum" NOT NULL DEFAULT 'auditor'`);
        await queryRunner.query(`ALTER TABLE "languages" ADD CONSTRAINT "UQ_4ec168f0d1926264d0bc015b040" UNIQUE ("shortname")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "languages" DROP CONSTRAINT "UQ_4ec168f0d1926264d0bc015b040"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "type" TO "type_of"`);
    }

}
