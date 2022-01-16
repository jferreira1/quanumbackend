import { MigrationInterface, QueryRunner } from "typeorm";

export class PopulateLanguages1642170137531 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO languages (name, shortname) VALUES ('portuguese','pt-BR')`
    );
    await queryRunner.query(
      `INSERT INTO languages (name, shortname) VALUES ('english','en-US')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM languages WHERE name = 'english'`);
    await queryRunner.query(`DELETE FROM languages WHERE name = 'portuguese'`);
  }
}
