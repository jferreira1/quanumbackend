import { getRepository } from "typeorm";
import Audit from "../../entities/Audit";

export class GetUsersOfAuditService {
  async execute(auditId: string) {
    try {
      const repo = getRepository("audits");
      const audit = await repo.findOne(auditId);

      if (!audit) {
        return new Error("Audit does not exists");
      }

      if (audit instanceof Audit) {
        const users = audit.users;

        return users;
      }

      throw new Error("Does not found solution");
    } catch (err) {
      if (err instanceof Error) {
        return err.message;
      }
    }
  }
}
