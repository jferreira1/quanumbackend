import { Request, Response } from "express";
import { GetUsersOfAuditService } from "../../services/Audit/GetUsersOfAuditService";

export class GetUsersOfAuditController {
  async handle(req: Request, res: Response) {
    const { auditId } = req.params;

    if (!auditId) {
      return res.sendStatus(400);
    }

    const service = new GetUsersOfAuditService();
    const response = await service.execute(auditId);

    // TO-DO: formatar resposta no padrão especificado
    return res.json(response);
  }
}
