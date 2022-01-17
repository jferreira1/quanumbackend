import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Form } from "../../app/entities/Form";
import { Question } from "../../app/entities/Question";
import { Topic } from "../../app/entities/Topic";
import { FormSeed } from "../seeds/form.seed";
import { questionSeed } from "../seeds/question.seed";

export class SeedForms1642383005463 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //const repo = await getRepository("forms");
    //const forms = repo.save(FormSeed);
    // const formOne = repo.findOne({ form_number: 1 });
    //await repo.save(questionSeed);
    // console.log(formOne);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
