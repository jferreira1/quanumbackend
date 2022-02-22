import { Request, Response } from "express";

import { getRepository } from "typeorm";

import User from "../entities/User";
import ResponseFormat from "../interfaces/ResponseFormat";

export class GetUserController {
  async index(req: Request, res: Response) {
    let response: ResponseFormat = {
      success: false,
      data: null,
      message: "",
    };

    try {
      const userId = req.params["userId"];
      const repository = getRepository(User);
      const user = await repository.findOneOrFail(userId);

      response = {
        success: true,
        data: user,
        message: "Usuário listado com sucesso!",
      };

      return res.json(response);
    } catch (err) {
      if (err instanceof Error) response.message = err.message;
      return res.json(response);
    }
  }
}
