import { Request, Response } from "express";
import ResponseFormat from "../interfaces/ResponseFormat";
import { GetAllUsersService } from "../services/GetAllUsersService";

export class GetAllUsersController {
  async handle(req: Request, res: Response) {
    let response: ResponseFormat = { data: null, success: false, message: "" };

    try {
      const service = new GetAllUsersService();
      const users = await service.execute();

      response = {
        success: true,
        data: users,
        message: "Os usuários foram listados com sucesso!",
      };

      return res.json(response);
    } catch (err) {
      if (err instanceof Error) {
        response.message = err.message;
        return res.json(response);
      }
    }
  }
}
