import { getRepository } from "typeorm";
import Audit from "../../entities/Audit";
import { Name } from "../../entities/Name";

export class GetFormsByAuditService {
  async execute(auditId: string) {
    try {
      const repo = getRepository(Audit);
      const audit = await repo.findOneOrFail(auditId);

      const forms = audit.forms;
      let formResponse: {
        form_id: number;
        form_number: string;
        form_names: {
          name: string;
          language: string;
        }[];
      }[] = [];

      const promises = forms.map(async (form) => {
        const repoName = getRepository(Name);
        const nameResponse = await repoName.find({
          where: { form: form },
          relations: ["language"],
        });

        const formNames = nameResponse.map((name) => {
          return {
            name: name.name,
            language: name.language.name,
          };
        });

        const response = {
          form_id: form.id,
          form_number: form.formNumber,
          form_names: formNames,
        };
        formResponse.push(response);
      });
      await Promise.all(promises);

      formResponse.sort((a, b) =>
        Number(a.form_number) > Number(b.form_number) ? 1 : -1
      );

      return formResponse;
    } catch (err) {
      throw err;
    }
  }
}
