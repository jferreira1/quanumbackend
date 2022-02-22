import { Request, Response } from "express";
import { AuditType } from "../../entities/Audit";
import ResponseFormat from "../../interfaces/ResponseFormat";

export class GetAuditsTypesController {
  async handle(req: Request, res: Response) {
    let response: ResponseFormat = {
      success: false,
      data: null,
      message: "",
    };
    try {
      response = {
        success: true,
        data: Object.keys(AuditType),
        message: "Os tipos de auditorias foram listados com sucesso!",
      };
    } catch (err) {
      if (err instanceof Error) response.message = err.message;
    } finally {
      return res.json(response);
    }
  }
}
