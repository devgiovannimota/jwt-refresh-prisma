"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authVerify_1 = require("../middleware/authVerify");
const database_1 = require("../database");
const route = (0, express_1.Router)();
route.all("*", authVerify_1.AuthVerify);
route.get("/getdata", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = request.userId;
    try {
        const user = yield database_1.UserModel.findById(userId);
        return response.status(200).send(user);
    }
    catch (error) {
        return response
            .status(400)
            .send("Não foi possível buscar no banco de dados");
    }
}));
route.get("/signOut", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const token = request.headers.authorization;
    try {
        yield database_1.BlackListModel.create({ token });
        return response.status(200).send("LogOut bem sucedido");
    }
    catch (error) { }
    return response.status(400).send("Não foi possível fazer logOut");
}));
exports.default = route;
