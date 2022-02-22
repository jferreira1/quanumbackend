import { getRepository } from "typeorm";
import Audit from "../../entities/Audit";

export class GetAuditByIdService {
  async execute(auditId: string) {
    try {
      const repo = getRepository(Audit);
      const audit = await repo.findOneOrFail(auditId);

      if (!audit) throw new Error("Audit are not registered");

      return audit;
    } catch (err) {
      throw err;
    }
  }
}
