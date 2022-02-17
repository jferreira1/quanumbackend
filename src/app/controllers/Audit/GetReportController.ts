import { Request, Response } from "express";
import { GetReportService } from "../../services/Audit/GetReportService";

export class GetReportController {
  async handle(req: Request, res: Response) {
    const { auditId } = req.params;
    if (!auditId) {
      return res.sendStatus(400);
    }

    const service = new GetReportService();
    const response = await service.execute(auditId);

    return res.json(response);
  }
}
