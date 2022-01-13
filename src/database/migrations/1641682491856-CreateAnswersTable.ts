import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAnswersTable1641682491856 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "answers",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "conformance_level",
            type: "enum",
            enum: ["NA", "0", "1", "2", "3", "4"],
          },
          {
            name: "comment",
            type: "text",
          },
          {
            name: "user_id",
            type: "integer",
          },
          {
            name: "question_id",
            type: "integer",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
          },
          {
            columnNames: ["question_id"],
            referencedTableName: "questions",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("answers");
  }
}
