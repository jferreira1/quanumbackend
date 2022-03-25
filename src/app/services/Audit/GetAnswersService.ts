import { getRepository } from "typeorm";
import { Answer, NonConformanceTypes } from "../../entities/Answer";
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

  async getNCs(auditId: string) {
    try {
      const audit = await getRepository(Audit).findOneOrFail(auditId);
      if (!audit) throw new Error("Audit of the given 'id' does not exists");

      const answers = await getRepository(Answer).find({
        where: [
          { audit: auditId, conformanceLevel: "3" },
          { audit: auditId, conformanceLevel: "4" },
        ],
        relations: [
          "question",
          "question.descriptions",
          "question.descriptions.language",
        ],
      });
      let criticals: number = 0,
        majors: number = 0,
        minors: number = 0;
      for (let answer of answers) {
        if (answer.ncPriority !== null) {
          if (answer.ncPriority === NonConformanceTypes.CRITICAL) criticals++;
          if (answer.ncPriority === NonConformanceTypes.MAJOR) majors++;
          if (answer.ncPriority === NonConformanceTypes.MINOR) minors++;
        }
      }

      let teste = {
        criticals: criticals,
        majors: majors,
        minors: minors,
        ...answers,
      };
      console.log(teste);
      //delete teste.comment;

      // for (let answer of answers) {
      //   console.log(answer);
      //   const question = await getRepository(Question).findOneOrFail(
      //     answer.question.id,
      //     { relations: ["descriptions"] }
      //   );

      //   for (let description of question.descriptions) {
      //     const descriptionObject = await getRepository(
      //       QuestionDescription
      //     ).findOneOrFail(description.id);
      //     console.log(descriptionObject);
      //   }

      //   answer.question = { ...question };
      //   console.log(answer);
      // }

      return teste;
    } catch (err) {
      throw err;
    }
  }
}
