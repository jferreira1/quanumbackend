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
      let questions = await repoQuestions.find({
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

      let formTopics = new Set<Topic[]>();
      const promise = questions.map(async (question) => {
        const questionDescription = await getRepository(
          QuestionDescription
        ).find({
          where: { question: question },
          relations: ["question", "language"],
        });

        const questionTopics = await getRepository(Topic).find({
          where: { question: question },
          relations: ["question", "language"],
        });

        if (formTopics.size === 0) {
          formTopics.add(questionTopics);
        }

        let founds: Topic[] = [];
        formTopics.forEach((formTopic) => {
          if (questionTopics[0].topic === formTopic[0].topic) {
            founds.push(formTopic[0]);
          }
          if (questionTopics[0].topic === formTopic[1].topic) {
            founds.push(formTopic[1]);
          }
          if (questionTopics[1].topic === formTopic[0].topic) {
            founds.push(formTopic[0]);
          }
          if (questionTopics[1].topic === formTopic[1].topic) {
            founds.push(formTopic[1]);
          }
        });

        if (!founds.length) {
          formTopics.add(questionTopics);
        }

        const questionPlaceholder = await getRepository(
          EvidencePlaceholder
        ).find({
          where: { question: question },
          relations: ["question", "language"],
        });

        let questionsRecords = [];
        for (let i = 0; i < questionDescription.length; i++) {
          questionsRecords.push({
            topic: questionTopics[i].topic,
            question: questionDescription[i].description,
            evidences_placeholder: questionPlaceholder[i].placeholder,
            language: questionTopics[i].language.name,
          });
        }

        const questionResponse = {
          question_id: question.id,
          question_number: question.questionNumber,
          records: questionsRecords,
        };
        formQuestions.push(questionResponse);
      });
      await Promise.all(promise);

      const formNames = await getRepository(Name).find({
        where: { form: form },
        relations: ["language"],
      });

      let formNamesByLanguages = {
        portuguese: formNames.find((n) => n.language.name === "portuguese")!
          .name,
        english: formNames.find((n) => n.language.name === "english")!.name,
      };

      type topicsResponse = {
        portuguese: string;
        english: string;
        questions: {
          id: number;
          number: string;
          portuguese: {
            question: string;
            evidencePlaceholder: string;
          };
          english: {
            question: string;
            evidencePlaceholder: string;
          };
        }[];
      };

      let topicsResponseArray: topicsResponse[] = [];

      questions = await getRepository(Question)
        .find({
          where: { form: form },
          relations: ["topics", "descriptions", "placeholders"],
        })
        .then((questions) =>
          questions.sort((questionA, questionB) => {
            let comparisonFirstNumber =
              Number(questionA.questionNumber.split(".")[0]) -
              Number(questionB.questionNumber.split(".")[0]);

            if (comparisonFirstNumber > 0) {
              let comparisonSecondNumber =
                Number(questionA.questionNumber.split(".")[1]) -
                Number(questionB.questionNumber.split(".")[1]);
              if (comparisonSecondNumber > 0) return comparisonSecondNumber;
              return comparisonFirstNumber;
            }
            return comparisonFirstNumber;
          })
        );

      let formTopicsSorted = Array.from(formTopics).sort(
        (topicA, topicB) => topicA[0].id - topicB[0].id
      );

      // Iteração de Set formTopics com arrays de tópicos em multiplos idiomas.
      for (let topics of formTopicsSorted) {
        let topicResponse: topicsResponse = {
          portuguese: "",
          english: "",
          questions: [],
        };

        // Iteração entre os idiomas de cada tópico
        for (let topicByLanguage of topics) {
          for (let question of questions) {
            if (question.topics[0].topic === topicByLanguage.topic) {
              topicResponse.questions.push({
                id: question.id,
                number: question.questionNumber,
                portuguese: {
                  question: question.descriptions[0].description,
                  evidencePlaceholder: question.placeholders[1].placeholder,
                },
                english: {
                  question: question.descriptions[1].description,
                  evidencePlaceholder: question.placeholders[0].placeholder,
                },
              });
            }

            for (let topicToTest of question.topics) {
              if (topicToTest.topic === topicByLanguage.topic) {
                if (topicByLanguage.language.name === "portuguese") {
                  topicResponse.portuguese = topicByLanguage.topic;
                }
                if (topicByLanguage.language.name === "english") {
                  topicResponse.english = topicByLanguage.topic;
                }
              }
            }
          }
        }
        topicsResponseArray.push(topicResponse);
      }

      let amountOfQuestions: number = await getRepository(Question)
        .find({
          where: { form: form },
        })
        .then((questions) => {
          return questions.length;
        });

      let response: {
        formId: number;
        formNumber: string;
        formNames: {
          portuguese: string;
          english: string;
        };
        amountOfQuestions: number;
        topics: topicsResponse[];
      } = {
        formId: form.id,
        formNumber: form.formNumber,
        formNames: formNamesByLanguages,
        amountOfQuestions: amountOfQuestions,
        topics: topicsResponseArray,
      };

      return response;
    } catch (err) {
      throw err;
    }
  }
}
