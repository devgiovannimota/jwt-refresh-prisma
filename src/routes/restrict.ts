import { Router, Request, Response } from "express";
import { AuthVerify } from "../middleware/authVerify";
import { BlackListModel, UserModel } from "../database";

const route = Router();

route.all("*", AuthVerify);

route.get("/getdata", async (request: Request | any, response: Response) => {
  const userId = request.userId;
  try {
    const user = await UserModel.findById(userId);
    return response.status(200).send(user);
  } catch (error) {
    return response
      .status(400)
      .send("Não foi possível buscar no banco de dados");
  }
});
route.get("/signOut", async (request: Request, response: Response) => {
  const token = request.headers.authorization;
  try {
    await BlackListModel.create({ token });
    return response.status(200).send("LogOut bem sucedido");
  } catch (error) {}
  return response.status(400).send("Não foi possível fazer logOut");
});

export default route;
