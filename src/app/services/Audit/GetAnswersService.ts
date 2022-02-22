import { getRepository } from "typeorm";
import { Answer } from "../../entities/Answer";
import Audit from "../../entities/Audit";
import { Question } from "../../entities/Question";

export class GetAnswersService {
  async execute(auditId: string, formId: string) {
    try {
      const audit = await getRepository(Audit).findOneOrFail(auditId);
      if (!audit) throw new Error("Audit of the given 'id' does not exists");

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
    } catch (err) {
      throw err;
    }
  }
}
