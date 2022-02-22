import { Request, Response } from "express";
import ResponseFormat from "../../interfaces/ResponseFormat";
import { CreateAnswersService } from "../../services/Audit/CreateAnswersService";

export class CreateAnswersController {
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
      const service = new CreateAnswersService();
      const answersResponse = await service.execute(
        userId,
        auditId,
        formId,
        answers
      );
      response = {
        success: true,
        data: answersResponse,
        message: "Respostas criadas com sucesso!",
      };
    } catch (err) {
      if (err instanceof Error) response.message = err.message;
    } finally {
      return res.json(response);
    }
  }
}
