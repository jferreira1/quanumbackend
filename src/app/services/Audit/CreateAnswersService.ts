import { getRepository } from "typeorm";
import { Answer, ConformanceLevels } from "../../entities/Answer";
import { Evidence } from "../../entities/Evidence";
import { Question } from "../../entities/Question";
import User from "../../entities/User";

export class CreateAnswersService {
  async execute(auditId: string, formId: string, answersRequest: []) {
    // TO-DO: Serviço de registro de answers
    try {
      let responseAnswers: Answer[] = [];
      const promises = answersRequest.map(
        async (answerRequest: {
          question_id: string;
          conformance_lvl: ConformanceLevels;
          comment: string;
          user_id: string;
          evidences: [string];
        }) => {
          let answer = new Answer();
          answer.conformanceLevel = answerRequest.conformance_lvl;
          answer.comment = answerRequest.comment;
          answer.question = await getRepository(Question).findOneOrFail(
            answerRequest.question_id
          );
          answer.user = await getRepository(User).findOneOrFail(
            answerRequest.user_id
          ); // user_id temporário

          let answersEvidences: Evidence[] = [];
          answerRequest.evidences.map(async (evidenceRequest) => {
            let evidence = new Evidence();
            evidence.link = evidenceRequest;
            evidence = await getRepository(Evidence).save(evidence);
            answersEvidences.push(evidence);
          });
          answer.evidences = answersEvidences;

          let savedAnswer = await getRepository(Answer).save(answer);
          responseAnswers.push(savedAnswer);
        }
      );
      await Promise.all(promises);

      return responseAnswers;
    } catch (err) {
      if (err instanceof Error) {
        return err.message;
      } else {
        console.log(err);
      }
    }

    const response = null;
    console.log(response);
    return;
  }
}
