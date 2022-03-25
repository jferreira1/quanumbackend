import { Request, Response } from "express";
import ResponseFormat from "../../interfaces/ResponseFormat";
import { GetAnswersService } from "../../services/Audit/GetAnswersService";

export class GetAnswersController {
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
      const service = new GetAnswersService();
      const answers = await service.execute(auditId, formId);
      response = {
        success: true,
        data: answers,
        message: "Respostas listadas com sucesso!",
      };
    } catch (err) {
      if (err instanceof Error) response.message = err.message;
    } finally {
      return res.json(response);
    }
  }

  async handleNonConformances(req: Request, res: Response) {
    let response: ResponseFormat = {
      success: false,
      data: null,
      message: "",
    };
    try {
      const { auditId } = req.params;
      if (!auditId) throw new Error("Audit id parameter was not provided.");
      const service = new GetAnswersService();
      const nConformances = await service.getNCs(auditId);
      response = {
        success: true,
        data: nConformances,
        message: "Respostas listadas com sucesso!",
      };
    } catch (err) {
      if (err instanceof Error) response.message = err.message;
    } finally {
      return res.json(response);
    }
  }
}
