import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAuditsTable1641521212443 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "audits",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "type",
            type: "enum",
            enum: ["internal", "external"],
            default: "'internal'",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "name_institution",
            type: "varchar",
          },
          {
            name: "email_institution",
            type: "varchar",
          },
          {
            name: "phone_institution",
            type: "varchar",
          },
          {
            name: "country_institution",
            type: "varchar",
          },
          {
            name: "city_institution",
            type: "varchar",
          },
          {
            name: "address_institution",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("audits");
  }
}
