import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateLanguagesTable1641592201114 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "languages",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
            isUnique: true,
          },
          {
            name: "shortname",
            type: "varchar",
            length: "5",
            isUnique: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("languages");
  }
}
