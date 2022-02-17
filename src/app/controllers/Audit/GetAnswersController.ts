import { Request, Response } from "express";
import { GetAnswersService } from "../../services/Audit/GetAnswersService";

export class GetAnswersController {
  async handle(req: Request, res: Response) {
    const { auditId, formId } = req.params;

    if (!auditId || !formId) {
      return res.sendStatus(400);
    }

    const service = new GetAnswersService();
    const response = await service.execute(auditId, formId);

    return res.json(response);
  }
}
