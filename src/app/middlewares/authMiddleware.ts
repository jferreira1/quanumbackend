import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ResponseFormat from "../interfaces/ResponseFormat";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let response: ResponseFormat = {
    success: false,
    data: null,
    message: "",
  };

  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error("Unauthorized access.");

    const token = authorization.replace("Bearer ", "").trim();
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    const { id } = data as TokenPayload;
    req.userId = id;
    return next();
  } catch (err) {
    if (err instanceof Error) response.message = err.message;
    return res.json(response);
  }
}
