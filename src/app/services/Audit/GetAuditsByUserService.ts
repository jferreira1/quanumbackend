import { getRepository } from "typeorm";
import Audit, { AuditType } from "../../entities/Audit";
import User from "../../entities/User";
import ResponseFormat from "../../interfaces/ResponseFormat";
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
  score_max: number;
  score_critical_limit: number;
  non_conformancies: number;
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
          score_max: report.scoreMax,
          score_critical_limit: report.scoreCriticalLimit,
          non_conformancies: report.nonConformancies,
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
