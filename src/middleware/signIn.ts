import { NextFunction, Request, Response } from "express";
import { RefreshTokenModel, UserModel } from "../database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const SignIn = async (
  request: Request | any,
  response: Response,
  next: NextFunction
) => {
  const { email, password } = request.body;
  if (!email || !password)
    return response.status(400).send("Insira todas as credenciais");
  try {
    const user = await UserModel.findOne({ email }).exec();
    if (!user) return response.status(400).send("Usuário não existe");
    if (!bcrypt.compareSync(password, user?.password as string))
      return response.status(400).send("Senha incorreta");

    await RefreshTokenModel.findByIdAndDelete({ userId: user._id });

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: 60 }
    );
    const refresh = jwt.sign(
      {
        userId: user._id,
      },
      process.env.REFRESH_SECRET as string,
      { expiresIn: "7d" }
    );
    await RefreshTokenModel.create({ refresh, userId: user._id });
    request.tokens = { token, refresh };

    next();
  } catch (error) {
    return response
      .status(400)
      .send({ message: "Não foi possível encontrar o usuário" });
  }
};
