import { Request, Response } from "express";
import { GetFormsByAuditService } from "../../services/Audit/GetFormsByAuditService";

export class GetFormsByAuditController {
  async handle(req: Request, res: Response) {
    const { auditId } = req.params;

    if (!auditId) {
      return res.sendStatus(400);
    }

    const service = new GetFormsByAuditService();
    const response = await service.execute(auditId);

    return res.json(response);
  }
}
