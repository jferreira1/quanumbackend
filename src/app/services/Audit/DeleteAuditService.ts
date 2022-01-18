import { getRepository } from "typeorm";

export class DeleteAuditService {
  async execute(auditId: string): Promise<boolean> {
    const repo = getRepository("audits");

    const result = await repo.delete(auditId);
    if (result.affected === 1) {
      return true;
    }
    return false;
  }
}
