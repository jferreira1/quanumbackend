import { MigrationInterface, QueryRunner } from "typeorm";

export class PopulateTopics1642170171046 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO languages (name, shortname) VALUES ('portuguese','pt-BR')`
    );
    await queryRunner.query(
      `INSERT INTO languages (name, shortname) VALUES ('english','en-US')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
