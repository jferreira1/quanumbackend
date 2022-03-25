import { getRepository } from "typeorm";
import {
  Answer,
  ConformanceLevels,
  NonConformanceTypes,
} from "../../entities/Answer";
import Audit from "../../entities/Audit";
import { Question } from "../../entities/Question";

interface FormResponse {
  formId: string;
  applicables: number;
  totalScore: number;
  percentageScore: string;
  nonConformances: number;
  nonConformancesUnclassified: number;
  criticals: number;
  majors: number;
  minors: number;
}
interface ReportResponse {
  forms: FormResponse[];
  total: {
    score: number;
    scoreMax: number;
    applicables: number;
    scoreCriticalLimit: number;
    percentageScore: string;
    nonConformances: number;
  };
}
export class GetReportService {
  score: number;
  scoreMax: number;
  scoreCriticalLimit: number;
  nonConformances: number;
  nonConformancesUnclassified: number;
  criticals: number;
  majors: number;
  minors: number;

  async getFormsReports(auditId: string) {
    try {
      const auditFound = await getRepository(Audit).findOneOrFail(auditId);
      if (!auditFound)
        throw new Error("Audit of given 'id' is not registered.");

      let formsResponse: FormResponse[] = [];
      let totalApplicables = 0;
      let totalTotalScore = 0;
      let totalPercentageScore = "";
      let totalNonConformances = 0;
      let totalNonConformancesUnclassified = 0;
      let totalCriticals = 0;
      let totalMajors = 0;
      let totalMinors = 0;

      for (let form of auditFound.forms) {
        const questions = await getRepository(Question).find({
          where: { form: form },
          relations: ["form"],
        });
        let totalScore: number = 0;
        let nonConformances: number = 0;
        let applicables: number = 0;
        let nonConformancesUnclassified: number = 0;
        let criticals: number = 0;
        let majors: number = 0;
        let minors: number = 0;
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
                nonConformances += 1;
              }
            }
            if (
              answer.conformanceLevel === "1" ||
              answer.conformanceLevel === "2" ||
              answer.conformanceLevel === "0"
            ) {
              if (answer.ncPriority === null) nonConformancesUnclassified += 1;
              if (answer.ncPriority === NonConformanceTypes.CRITICAL)
                criticals += 1;
              if (answer.ncPriority === NonConformanceTypes.MAJOR) majors += 1;
              if (answer.ncPriority === NonConformanceTypes.MINOR) minors += 1;
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
          totalScore: totalScore,
          percentageScore: percentageScore,
          nonConformances: nonConformances,
          nonConformancesUnclassified: nonConformancesUnclassified,
          criticals: criticals,
          majors: majors,
          minors: minors,
        };

        totalApplicables += applicables;
        totalTotalScore += totalScore;
        totalNonConformances += nonConformances;
        totalNonConformancesUnclassified += nonConformancesUnclassified;
        totalCriticals += criticals;
        totalMajors += majors;
        totalMinors += minors;

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
        nonConformances: totalNonConformances,
      };

      this.score = totalTotalScore;
      this.scoreMax = totalApplicables * 4;
      this.scoreCriticalLimit = totalApplicables * 2;
      this.nonConformances = totalNonConformances;
      this.nonConformancesUnclassified = totalNonConformancesUnclassified;
      this.criticals = totalCriticals;
      this.majors = totalMajors;
      this.minors = totalMinors;

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
