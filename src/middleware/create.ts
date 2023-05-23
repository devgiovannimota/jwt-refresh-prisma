import { NextFunction, Request, Response } from "express";
import { UserModel } from "../database";

export const CreateMidl = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email, password, name } = request.body;
  if (!email || password || name)
    return response.status(400).send("Insira todos os dados");
  try {
    const user = await UserModel.findOne({ email });
    if (user) return response.send("Usuário já existe");

    await UserModel.create({ email, password, name });

    next();
  } catch (error) {
    return response
      .status(400)
      .send("Não foi possível fazer a busca no banco de dados");
  }
};
