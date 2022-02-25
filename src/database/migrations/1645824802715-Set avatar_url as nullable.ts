import {MigrationInterface, QueryRunner} from "typeorm";

export class SetAvatarUrlAsNullable1645824802715 implements MigrationInterface {
    name = 'SetAvatarUrlAsNullable1645824802715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "avatar_url" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "avatar_url" SET NOT NULL`);
    }

}
