import { getRepository } from "typeorm";
import { Answer, ConformanceLevels } from "../../entities/Answer";
import Audit from "../../entities/Audit";
import { Evidence } from "../../entities/Evidence";
import { Form } from "../../entities/Form";
import { Question } from "../../entities/Question";
import User from "../../entities/User";
// import { AnswerRequest } from "./CreateAnswersService";

interface AnswerRequest {
  id?: number;
  conformance_lvl: ConformanceLevels;
  comment: string;
  question_id: string;
  evidences: string[];
}

export class UpdateAnswersService {
  async execute(
    userId: string,
    auditId: string,
    formId: string,
    answersRequest: [AnswerRequest]
  ) {
    try {
      const audit = await getRepository(Audit).findOneOrFail(auditId);
      if (!audit) throw new Error("Audit of the given 'id' does not exists");

      const form = await getRepository(Form).findOneOrFail({
        where: { id: formId },
        relations: ["audit"],
      });

      const auditFound = form.audit.filter((formAudit) => {
        return formAudit.id === audit.id;
      });

      let answer: Answer;
      let responseAnswers: Answer[] = [];

      for (let answerRequest of answersRequest) {
        if (answerRequest.id) {
          answer = await getRepository(Answer).findOneOrFail({
            where: {
              id: answerRequest.id,
              question: answerRequest.question_id,
              audit: auditId,
            },
          });
        } else {
          answer = new Answer();
        }

        let evidencesArray: Evidence[] = [];

        answer.audit = auditFound[0];
        answer.comment = answerRequest.comment;
        answer.conformanceLevel = answerRequest.conformance_lvl;
        const promises = answerRequest.evidences.map(async (link) => {
          let evidenceObject = new Evidence();
          evidenceObject.link = link;
          evidenceObject.answers = [answer];
          evidenceObject = await getRepository(Evidence).save(evidenceObject);
          evidencesArray.push(evidenceObject);
        });
        await Promise.all(promises);
        answer.evidences = evidencesArray;
        answer.question = await getRepository(Question).findOneOrFail(
          answerRequest.question_id
        );
        answer.user = await getRepository(User).findOneOrFail(userId);

        responseAnswers.push(await getRepository(Answer).save(answer));
      }

      responseAnswers = await getRepository(Answer).find({
        where: { audit: audit },
        relations: ["question", "evidences"],
      });

      return responseAnswers;
    } catch (err) {
      throw err;
    }
  }

  async updatePriorities(
    auditId: string,
    answersRequest: { answer_id: string; ncPriority: number }[]
  ) {
    try {
      let answersUpdated = [];
      for (let answerRequest of answersRequest) {
        let answerToUpdate = await getRepository(Answer).findOneOrFail(
          answerRequest.answer_id,
          { relations: ["audit"] }
        );
        if (answerToUpdate.audit.id === Number(auditId)) {
          answerToUpdate.ncPriority = answerRequest.ncPriority;
          let answerUpdated = await getRepository(Answer).save(answerToUpdate);
          const { audit, ...answerToSend } = answerUpdated;
          answersUpdated.push(answerToSend);
        }
      }
      return answersUpdated;
    } catch (err) {
      throw err;
    }
  }
}
