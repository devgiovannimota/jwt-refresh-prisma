"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signIn_1 = require("../middleware/signIn");
const create_1 = require("../middleware/create");
const route = (0, express_1.Router)();
route.get("/login", signIn_1.SignIn, (request, response) => {
    return response.status(200).send({ tokens: request.tokens });
});
route.get("/create", create_1.CreateMidl, (request, response) => {
    return response.status(200).send("create");
});
exports.default = route;
