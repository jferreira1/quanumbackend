import { Request, Response } from "express";
import ResponseFormat from "../../interfaces/ResponseFormat";
import { UpdateAnswersService } from "../../services/Audit/UpdateAnswersService";

export class UpdateAnswersController {
  async handle(req: Request, res: Response) {
    let response: ResponseFormat = {
      success: false,
      data: null,
      message: "",
    };
    try {
      const { auditId, formId } = req.params;
      const userId = req.userId;
      const answers = req.body;
      if (!auditId || !formId || !answers)
        throw new Error("Route parameters was not provided.");
      const service = new UpdateAnswersService();
      const answersResponse = await service.execute(
        userId,
        auditId,
        formId,
        answers
      );
      response = {
        success: true,
        data: answersResponse,
        message: "Respostas atualizadas com sucesso!",
      };
    } catch (err) {
      if (err instanceof Error) response.message = err.message;
    } finally {
      res.json(response);
    }
  }

  async handleNCPriorities(req: Request, res: Response) {
    let response: ResponseFormat = {
      success: false,
      data: null,
      message: "",
    };

    try {
      const { auditId } = req.params;
      if (!auditId) throw new Error("Parameter 'audit_id' was not provided.");
      const answers = req.body;
      if (!answers) throw new Error("Request body was not provided.");

      const service = new UpdateAnswersService();
      const answersResponse = await service.updatePriorities(auditId, answers);
      response = {
        success: true,
        data: answersResponse,
        message: "Prioridades atualizadas com sucesso!",
      };
    } catch (err) {
      if (err instanceof Error) response.message = err.message;
    } finally {
      res.json(response);
    }
  }
}
