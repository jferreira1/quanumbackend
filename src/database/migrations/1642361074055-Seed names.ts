import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { NameSeedPortuguese, NameSeedEnglish } from "../seeds/name.seed";

export class SeedNames1642361074055 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const names = await getRepository("names").save();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
