import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAnswerNcPriority1648058835492 implements MigrationInterface {
    name = 'AddAnswerNcPriority1648058835492'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."answers_nc_priority_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`ALTER TABLE "answers" ADD "nc_priority" "public"."answers_nc_priority_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers" DROP COLUMN "nc_priority"`);
        await queryRunner.query(`DROP TYPE "public"."answers_nc_priority_enum"`);
    }

}
