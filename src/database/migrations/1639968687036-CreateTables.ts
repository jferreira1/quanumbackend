import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTables1639968687036 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "email",
            type: "varchar",
            length: "255",
            isUnique: true,
          },
          {
            name: "pw_hash",
            type: "varchar",
          },
          {
            name: "firstname",
            type: "varchar",
            length: "255",
          },
          {
            name: "lastname",
            type: "varchar",
            length: "255",
          },
          {
            name: "occupation_role",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "type",
            type: "enum",
            enum: ["manager", "auditor"],
          },
          {
            name: "avatar_url",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
