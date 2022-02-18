import { getRepository } from "typeorm";
import { Answer, ConformanceLevels } from "../../entities/Answer";
import Audit from "../../entities/Audit";
import { Form } from "../../entities/Form";
import { Question } from "../../entities/Question";
import User from "../../entities/User";

export interface AnswerRequest {
  conformance_lvl: ConformanceLevels;
  comment: string;
  question_id: string;
}

export class CreateAnswersService {
  async execute(
    userId: string,
    auditId: string,
    formId: string,
    answersRequest: [AnswerRequest]
  ) {
    try {
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

      let responseAnswers: Answer[] = [];
      for (let answerRequest of answersRequest) {
        let answer = new Answer();
        answer.audit = auditFound[0];
        answer.comment = answerRequest.comment;
        answer.conformanceLevel = answerRequest.conformance_lvl;
        answer.question = await getRepository(Question).findOneOrFail(
          answerRequest.question_id
        );
        answer.user = await getRepository(User).findOneOrFail(userId);

        responseAnswers.push(await getRepository(Answer).save(answer));
      }

      return await getRepository(Answer).find({
        where: { audit: audit },
        relations: ["question"],
      });

      return responseAnswers;
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log(err);
      }
    }
  }
}
