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
        relations: ["question", "evidences"],
      });
      const questions = await getRepository(Question).find({
        where: { form: formId },
        relations: ["form"],
      });
      let answersResponse = [];

      for (let answer of answers) {
        if (questions.find((question) => answer.question.id === question.id)) {
          let responseArrayEvidences = [];
          for (let evidence of answer.evidences) {
            responseArrayEvidences.push(evidence.link);
          }
          let answerResponse = {
            id: answer.id,
            question_id: answer.question.id,
            conformance_lvl: answer.conformanceLevel,
            comment: answer.comment,
            evidences: responseArrayEvidences,
          };
          answersResponse.push(answerResponse);
        }
      }

      return answersResponse;
    } catch (err) {
      throw err;
    }
  }
}
