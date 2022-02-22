import { getRepository } from "typeorm";
import Audit from "../../entities/Audit";

export class GetUsersOfAuditService {
  async execute(auditId: string) {
    try {
      const repo = getRepository(Audit);
      const audit = await repo.findOneOrFail(auditId);
      if (!audit) throw new Error("Audit does not exists");
      const users = audit.users;
      return users;
    } catch (err) {
      throw err;
    }
  }
}
