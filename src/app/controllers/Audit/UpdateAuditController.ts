import { Request, Response } from "express";
import { UpdateAuditService } from "../../services/Audit/UpdateAuditService";

export class UpdateAuditController {
  async handle(req: Request, res: Response) {
    const { auditId: auditId } = req.params;

    if (!auditId) {
      return res.sendStatus(400);
    }
    const service = new UpdateAuditService();
    const response = await service.execute(auditId, req.body);

    return res.json(response);
  }
}
