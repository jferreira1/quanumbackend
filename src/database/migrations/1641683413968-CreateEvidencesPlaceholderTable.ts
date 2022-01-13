import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEvidencesPlaceholderTable1641683413968
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "evidences_placeholder",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "placeholder",
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
    await queryRunner.dropTable("evidences_placeholder");
  }
}
