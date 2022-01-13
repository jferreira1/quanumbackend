import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateQuestionDescsTable1641682862879
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "questions_desc",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "question_id",
            type: "integer",
          },
          {
            name: "language_id",
            type: "integer",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["question_id"],
            referencedTableName: "questions",
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
    await queryRunner.dropTable("questions_desc");
  }
}
