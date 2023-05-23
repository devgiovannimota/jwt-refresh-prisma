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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthVerify = void 0;
const database_1 = require("../database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthVerify = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = request.headers.authorization;
    try {
        const blackList = yield database_1.BlackListModel.findOne({ token });
        if (blackList)
            return response.status(400).send("Token na blacklist");
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err)
                return response.status(401).send("Token inspirado");
            request.userId = decode.userId;
            next();
        });
    }
    catch (error) {
        return response
            .status(400)
            .send("Não foi possível buscar no banco de dados");
    }
});
exports.AuthVerify = AuthVerify;
