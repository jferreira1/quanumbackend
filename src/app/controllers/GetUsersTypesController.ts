import { Request, Response } from "express";
import { UserType } from "../entities/User";
import ResponseFormat from "../interfaces/ResponseFormat";

export class GetUsersTypesController {
  async handle(req: Request, res: Response) {
    let response: ResponseFormat = {
      success: false,
      data: null,
      message: "",
    };
    try {
      response = {
        success: true,
        data: Object.keys(UserType),
        message: "Os tipos de usuário foram listados com sucesso!",
      };
    } catch (err) {
      if (err instanceof Error) response.message = err.message;
    } finally {
      return res.json(response);
    }
  }
}
