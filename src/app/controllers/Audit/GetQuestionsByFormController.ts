import { Request, Response } from "express";
import ResponseFormat from "../../interfaces/ResponseFormat";
import { GetQuestionsByFormService } from "../../services/Audit/GetQuestionsByFormService";

export class GetQuestionsByFormController {
  async handle(req: Request, res: Response) {
    let response: ResponseFormat = {
      success: false,
      data: null,
      message: "",
    };
    try {
      const { auditId, formId } = req.params;
      if (!auditId || !formId)
        throw new Error("Route parameters was not provided.");
      const service = new GetQuestionsByFormService();
      const questions = await service.execute(auditId, formId);
      response = {
        success: true,
        data: questions,
        message: "Questões listadas com sucesso!",
      };
    } catch (err) {
      if (err instanceof Error) response.message = err.message;
    } finally {
      return res.json(response);
    }
  }
}
