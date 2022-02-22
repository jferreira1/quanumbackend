import { Request, Response } from "express";
import ResponseFormat from "../interfaces/ResponseFormat";
import { CreateUserService } from "../services/CreateUserService";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    let response: ResponseFormat = {
      success: false,
      data: null,
      message: "",
    };

    try {
      const {
        email,
        password,
        firstname,
        lastname,
        occupation_role,
        user_type,
        avatar_url,
      } = req.body;

      const service = new CreateUserService();
      const result = await service.execute({
        email,
        password,
        firstname,
        lastname,
        occupation_role,
        user_type,
        avatar_url,
      });

      if (result instanceof Error) {
        throw result;
      }

      response = {
        success: true,
        data: result,
        message: "O usuário foi registrado com sucesso!",
      };

      return res.json(response);
    } catch (err) {
      if (err instanceof Error) {
        response = { success: false, data: null, message: err.message };
        return res.json(response);
      }
    }
  }
}
