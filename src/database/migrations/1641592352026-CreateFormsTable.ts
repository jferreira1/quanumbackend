import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFormsTable1641592352026 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "forms",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "audit_id",
            type: "integer",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["audit_id"],
            referencedTableName: "audits",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("forms");
  }
}
