import { Request, Response } from "express";
import { CreateAnswersService } from "../../services/Audit/CreateAnswersService";

export class CreateAnswersController {
  async handle(req: Request, res: Response) {
    const { auditId, formId } = req.params;
    const answers = req.body;

    if (!auditId || !formId || !answers) {
      return res.sendStatus(400);
    }

    const service = new CreateAnswersService();
    const response = await service.execute(auditId, formId, answers);

    return res.json(response);
  }
}
