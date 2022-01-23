import { getRepository } from "typeorm";

export class GetAuditByIdService {
  async execute(auditId: string) {
    try {
      const repo = getRepository("audits");
      const audit = await repo.findOne(auditId);

      if (!audit) {
        return new Error("Audit are not registered");
      }

      return audit;
    } catch (err) {
      if (err instanceof Error) {
        return err.message;
      }
    }
  }
}
