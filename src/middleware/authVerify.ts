import { NextFunction, Request, Response } from "express";
import { BlackListModel } from "../database";
import jwt from "jsonwebtoken";

export const AuthVerify = async (
  request: Request | any,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization;

  try {
    const blackList = await BlackListModel.findOne({ token });
    if (blackList) return response.status(400).send("Token na blacklist");

    jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
      (err, decode: any) => {
        if (err) return response.status(401).send("Token inspirado");
        request.userId = decode.userId;
        next();
      }
    );
  } catch (error) {
    return response
      .status(400)
      .send("Não foi possível buscar no banco de dados");
  }
};
