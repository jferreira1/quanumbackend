import { getRepository } from "typeorm";
import { Answer } from "../../entities/Answer";
import Audit from "../../entities/Audit";
import { Form } from "../../entities/Form";
import { Question } from "../../entities/Question";

export class GetAnswersService {
  async execute(auditId: string, formId: string) {
    const audit = await getRepository(Audit).findOneOrFail(auditId);
    if (!audit) {
      return new Error("Audit of the given 'id' does not exists");
    }
    const form = await getRepository(Form).findOneOrFail({
      where: { id: formId },
      relations: ["audit"],
    });

    const auditFound = form.audit.filter((formAudit) => {
      return formAudit.id === audit.id;
    });

    const answers = await getRepository(Answer).find({
      where: { audit: auditId },
      relations: ["question"],
    });

    let answersResponse = [];
    for (let answer of answers) {
      const question = await getRepository(Question).findOneOrFail(
        answer.question,
        {
          relations: ["form"],
        }
      );

      if (question.form.id === Number(formId)) {
        answersResponse.push(answer);
      }
    }
    return answersResponse;
  }
}
