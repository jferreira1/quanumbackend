import { getRepository } from "typeorm";
import Audit from "../../entities/Audit";
import { EvidencePlaceholder } from "../../entities/EvidencePlaceholder";
import { Name } from "../../entities/Name";
import { Question } from "../../entities/Question";
import { QuestionDescription } from "../../entities/QuestionDescription";
import { Topic } from "../../entities/Topic";

export class GetQuestionsByFormService {
  async execute(auditId: string, formId: string) {
    try {
      const repoAudit = getRepository(Audit);
      const audit = await repoAudit.findOneOrFail(auditId);
      if (!audit) throw new Error('Audit of the given "id" does not exists');

      const form = audit.forms.find((form) => {
        return String(form.id) === formId;
      });
      if (!form) throw new Error('Form of the given "id" does not exists');

      const repoQuestions = getRepository(Question);
      const questions = await repoQuestions.find({
        where: { form: form },
        relations: ["form"],
      });

      let formQuestions: {
        question_id: number;
        question_number: string;
        records: {
          topic: string;
          question: string;
          evidences_placeholder: string;
          language: string;
        }[];
      }[] = [];
      const promises = questions.map(async (question) => {
        const questionDescription = await getRepository(
          QuestionDescription
        ).find({
          where: { question: question },
          relations: ["question", "language"],
        });

        const questionTopic = await getRepository(Topic).find({
          where: { question: question },
          relations: ["question", "language"],
        });

        const questionPlaceholder = await getRepository(
          EvidencePlaceholder
        ).find({
          where: { question: question },
          relations: ["question", "language"],
        });

        let questionsRecords = [];
        for (let i = 0; i < questionDescription.length; i++) {
          questionsRecords.push({
            topic: questionTopic[i].topic,
            question: questionDescription[i].description,
            evidences_placeholder: questionPlaceholder[i].placeholder,
            language: questionTopic[i].language.name,
          });
        }

        const questionResponse = {
          question_id: question.id,
          question_number: question.questionNumber,
          records: questionsRecords,
        };
        formQuestions.push(questionResponse);
      });
      await Promise.all(promises);
      const formNames = await getRepository(Name).find({
        where: { form: form },
        relations: ["language"],
      });

      const response = {
        form_id: form.id,
        form_number: form.formNumber,
        form_names: formNames,
        questions: formQuestions,
      };

      return response;
    } catch (err) {
      throw err;
    }
  }
}
