import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateJoinAuditsUsersTable1641683563882
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "audits_users",
        columns: [
          {
            name: "audit_id",
            type: "integer",
          },
          {
            name: "user_id",
            type: "integer",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["audit_id"],
            referencedTableName: "audits",
            referencedColumnNames: ["id"],
          },
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("audits_users");
  }
}
