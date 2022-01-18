import { Request, Response } from "express";
import { DeleteAuditService } from "../../services/Audit/DeleteAuditService";

export class DeleteAuditController {
  async handle(req: Request, res: Response) {
    // TO-DO: Authorization check

    const { auditId } = req.params;

    if (!auditId) {
      return res.sendStatus(400);
    }
    const service = new DeleteAuditService();
    const isDeleted = await service.execute(auditId);
    if (isDeleted) {
      return res.sendStatus(200);
    } else {
      return res.sendStatus(400);
    }
  }
}
