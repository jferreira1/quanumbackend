import { Request, Response } from "express";
import ResponseFormat from "../interfaces/ResponseFormat";
import { UpdateUserService } from "../services/UpdateUserService";

export class UpdateUserController {
  async handle(req: Request, res: Response) {
    let response: ResponseFormat = {
      success: false,
      data: null,
      message: "",
    };
    try {
      const { userId } = req.params;
      if (!userId) throw new Error('"user_id" was not provided.');

      const service = new UpdateUserService();
      const userUpdated = await service.execute(userId, req.body);

      response = {
        success: true,
        data: userUpdated,
        message: "O usuário foi atualizado com sucesso!",
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
