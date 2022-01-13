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
            default: "internal",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "name_institution",
            type: "string",
          },
          {
            name: "email_institution",
            type: "string",
          },
          {
            name: "phone_institution",
            type: "string",
          },
          {
            name: "country_institution",
            type: "string",
          },
          {
            name: "city_institution",
            type: "string",
          },
          {
            name: "address_institution",
            type: "string",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("audits");
  }
}
