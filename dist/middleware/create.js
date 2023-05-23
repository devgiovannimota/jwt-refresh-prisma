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
exports.CreateMidl = void 0;
const database_1 = require("../database");
const CreateMidl = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = request.body;
    if (!email || password || name)
        return response.status(400).send("Insira todos os dados");
    try {
        const user = yield database_1.UserModel.findOne({ email });
        if (user)
            return response.send("Usuário já existe");
        yield database_1.UserModel.create({ email, password, name });
        next();
    }
    catch (error) {
        return response
            .status(400)
            .send("Não foi possível fazer a busca no banco de dados");
    }
});
exports.CreateMidl = CreateMidl;
