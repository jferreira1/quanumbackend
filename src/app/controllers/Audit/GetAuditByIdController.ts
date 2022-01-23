import { Request, Response } from "express";
import { GetAuditByIdService } from "../../services/Audit/GetAuditByIdService";

export class GetAuditByIdController {
  async handle(req: Request, res: Response) {
    const { auditId } = req.params;

    if (!auditId) {
      return res.sendStatus(400);
    }

    const service = new GetAuditByIdService();
    const response = await service.execute(auditId);

    // TO-DO: Formatar response para o especificado
    // TO-DO: Implementar autenticação

    return res.json(response);
  }
}
