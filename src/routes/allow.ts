import { Router, Request, Response } from "express";
import { SignIn } from "../middleware/signIn";
import { CreateMidl } from "../middleware/create";

const route = Router();

route.get("/login", SignIn, (request: Request | any, response: Response) => {
  return response.status(200).send({ tokens: request.tokens });
});

route.get("/create", CreateMidl, (request: Request, response: Response) => {
  return response.status(200).send("create");
});

export default route;
