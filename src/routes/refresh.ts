import { Request, Response, Router } from "express";
import { RefreshTokenModel } from "../database";
import jwt from "jsonwebtoken";

const route = Router();

route.post("/refresh", async (request: Request, response: Response) => {
  const refresh = request.headers.authorization;

  try {
    const theRrefresh = await RefreshTokenModel.findOne({ refresh });
    if (!theRrefresh)
      return response.status(400).send("Sessão expirada, faça login novamente");
    const userId = theRrefresh?.userId;

    jwt.verify(
      refresh as string,
      process.env.REFERESH_SECRET as string,
      async (err, decode: any) => {
        if (err) return response.status(400).send("Sessão expirada");

        if (decode) await RefreshTokenModel.findByIdAndDelete({ refresh });

        const newToken = jwt.sign(
          { userId },
          process.env.JWT_SECRET as string,
          { expiresIn: 30 }
        );
        const newRefresh = jwt.sign(
          { userId },
          process.env.JWT_SECRET as string,
          { expiresIn: "7d" }
        );

        await RefreshTokenModel.create({ refresh: newRefresh, userId });
        return response
          .status(200)
          .send({ tokens: { token: newToken, refresh: newRefresh } });
      }
    );
  } catch (error) {
    return response.status(400).send("Não foi possível renovar a sessão");
  }
});

export default route;
