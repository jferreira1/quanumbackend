import { Request, Response } from "express";
import { GetQuestionsByFormService } from "../../services/Audit/GetQuestionsByFormService";

export class GetQuestionsByFormController {
  async handle(req: Request, res: Response) {
    const { auditId, formId } = req.params;

    if (!auditId || !formId) {
      return res.sendStatus(400);
    }

    const service = new GetQuestionsByFormService();
    const response = await service.execute(auditId, formId);

    return res.json(response);
  }
}
