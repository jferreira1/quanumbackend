import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateNamesTable1641592352027 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "names",
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
          },
          {
            name: "form_id",
            type: "integer",
          },
          {
            name: "language_id",
            type: "integer",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["form_id"],
            referencedTableName: "forms",
            referencedColumnNames: ["id"],
          },
          {
            columnNames: ["language_id"],
            referencedTableName: "languages",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("names");
  }
}
