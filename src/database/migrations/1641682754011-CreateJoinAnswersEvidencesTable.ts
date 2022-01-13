import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateJoinAnswersEvidencesTable1641682754011
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "answers_evidences",
        columns: [
          {
            name: "answer_id",
            type: "integer",
          },
          {
            name: "evidence_id",
            type: "integer",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["answer_id"],
            referencedTableName: "answers",
            referencedColumnNames: ["id"],
          },
          {
            columnNames: ["evidence_id"],
            referencedTableName: "evidences",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("answers_evidences");
  }
}
