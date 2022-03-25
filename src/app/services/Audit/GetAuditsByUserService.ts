import { getRepository } from "typeorm";
import Audit, { AuditType } from "../../entities/Audit";
import User from "../../entities/User";
import { GetReportService } from "./GetReportService";

type AuditResponse = {
  id: number;
  nameInstitution: string;
  emailInstitution: string;
  phoneInstitution: string;
  countryInstitution: string;
  cityInstitution: string;
  addressInstitution: string;
  type: AuditType;
  createdAt: Date;
  score: number;
  scoreMax: number;
  scoreCriticalLimit: number;
  nonConformances: number;
  nonConformancesUnclassified: number;
  criticals: number;
  majors: number;
  minors: number;
};

export class GetAuditsByUserService {
  async execute(userId: string): Promise<any> {
    try {
      const repo = getRepository("audits");
      const audits = await repo
        .createQueryBuilder()
        .relation(User, "audits")
        .of(userId)
        .loadMany();
      let auditsResponse: AuditResponse[] = [];

      const promise = audits.map(async (audit: Audit) => {
        const report = new GetReportService();
        await report.getFormsReports(String(audit.id));

        let auditResponse: AuditResponse = {
          ...audit,
          score: report.score,
          scoreMax: report.scoreMax,
          scoreCriticalLimit: report.scoreCriticalLimit,
          nonConformances: report.nonConformances,
          nonConformancesUnclassified: report.nonConformancesUnclassified,
          criticals: report.criticals,
          majors: report.majors,
          minors: report.minors,
        };
        auditsResponse.push(auditResponse);
      });
      await Promise.all(promise);
      return auditsResponse;
    } catch (err) {
      throw err;
    }
  }
}
