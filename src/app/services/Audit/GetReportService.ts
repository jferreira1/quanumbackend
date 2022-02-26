import { getRepository } from "typeorm";
import { Answer, ConformanceLevels } from "../../entities/Answer";
import Audit from "../../entities/Audit";
import { Question } from "../../entities/Question";

interface FormResponse {
  formId: string;
  applicables: number;
  total_score: number;
  percentage_score: string;
  non_conformancies: number;
}
interface ReportResponse {
  forms: FormResponse[];
  total: {
    score: number;
    scoreMax: number;
    applicables: number;
    scoreCriticalLimit: number;
    percentageScore: string;
    nonConformancies: number;
  };
}
export class GetReportService {
  score: number;
  scoreMax: number;
  scoreCriticalLimit: number;
  nonConformancies: number;

  async getFormsReports(auditId: string) {
    try {
      const auditFound = await getRepository(Audit).findOneOrFail(auditId);
      if (!auditFound)
        throw new Error("Audit of given 'id' is not registered.");

      let formsResponse: FormResponse[] = [];
      let totalApplicables = 0;
      let totalTotalScore = 0;
      let totalPercentageScore = "";
      let totalNonConformancies = 0;

      for (let form of auditFound.forms) {
        const questions = await getRepository(Question).find({
          where: { form: form },
          relations: ["form"],
        });
        let totalScore: number = 0;
        let nonConformancies: number = 0;
        let applicables: number = 0;
        for (let question of questions) {
          const answers = await getRepository(Answer).find({
            where: { question: question.id, audit: auditFound.id },
            relations: ["question", "audit"],
          });
          const answer = answers.pop();
          if (answer?.conformanceLevel) {
            if (answer.conformanceLevel !== ConformanceLevels.NA) {
              applicables += 1;
              totalScore += Number(answer.conformanceLevel);
              if (Number(answer.conformanceLevel) <= 2) {
                nonConformancies += 1;
              }
            }
          }
        }
        let percentageScore =
          totalScore +
          "/" +
          applicables * 4 +
          " - " +
          (totalScore / (applicables * 4)) * 100 +
          "%";

        let formResponse = {
          formId: String(form.id),
          applicables: applicables,
          total_score: totalScore,
          percentage_score: percentageScore,
          non_conformancies: nonConformancies,
        };

        totalApplicables += applicables;
        totalTotalScore += totalScore;
        totalNonConformancies += nonConformancies;

        formsResponse.push(formResponse);
      }

      totalPercentageScore =
        totalTotalScore +
        "/" +
        totalApplicables * 4 +
        " - " +
        (totalTotalScore / (totalApplicables * 4)) * 100 +
        "%";

      let totalResponse = {
        score: totalTotalScore,
        scoreMax: totalApplicables * 4,
        applicables: totalApplicables,
        scoreCriticalLimit: totalApplicables * 2,
        percentageScore: totalPercentageScore,
        nonConformancies: totalNonConformancies,
      };

      this.score = totalTotalScore;
      this.scoreMax = totalApplicables * 4;
      this.scoreCriticalLimit = totalApplicables * 2;
      this.nonConformancies = totalNonConformancies;

      let reportResponse: ReportResponse = {
        forms: formsResponse,
        total: totalResponse,
      };

      return reportResponse;
    } catch (err) {
      throw err;
    }
  }
}
