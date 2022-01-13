import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateQuestionsTable1641682245827 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "questions",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "form_id",
            type: "integer",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["form_id"],
            referencedTableName: "forms",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("questions");
  }
}
