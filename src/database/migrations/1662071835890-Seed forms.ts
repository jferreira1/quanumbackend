import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Form } from "../../app/entities/Form";
import { Language } from "../../app/entities/Language";
import { Name } from "../../app/entities/Name";
import { LanguageSeed } from "../seeds/language.seed";
import { NameSeed } from "../seeds/name.seed";

export class SeedForms1662071835890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository("languages").save(LanguageSeed);

    const repoForm = getRepository(Form);
    const repoName = getRepository(Name);
    const repoLanguage = getRepository(Language);

    for (let i = 0; i < 14; i++) {
      let form = new Form();
      form.formNumber = String(i + 1);
      form = await repoForm.save(form);

      const name_pt = new Name();
      name_pt.form = form;
      name_pt.name = NameSeed[i].name_pt;
      name_pt.language = await repoLanguage.findOneOrFail({
        name: "portuguese",
      });
      //const responseNamePt = await repoName.save(name_pt);
      await repoName.save(name_pt);

      const name_en = new Name();
      name_en.form = form;
      name_en.name = NameSeed[i].name_en;
      name_en.language = await repoLanguage.findOneOrFail({ name: "english" });
      //const responseNameEn = await repoName.save(name_en);
      await repoName.save(name_en);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
