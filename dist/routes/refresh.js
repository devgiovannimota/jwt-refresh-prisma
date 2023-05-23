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
const express_1 = require("express");
const database_1 = require("../database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const route = (0, express_1.Router)();
route.post("/refresh", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const refresh = request.headers.authorization;
    try {
        const theRrefresh = yield database_1.RefreshTokenModel.findOne({ refresh });
        if (!theRrefresh)
            return response.status(400).send("Sessão expirada, faça login novamente");
        const userId = theRrefresh === null || theRrefresh === void 0 ? void 0 : theRrefresh.userId;
        jsonwebtoken_1.default.verify(refresh, process.env.REFERESH_SECRET, (err, decode) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                return response.status(400).send("Sessão expirada");
            if (decode)
                yield database_1.RefreshTokenModel.findByIdAndDelete({ refresh });
            const newToken = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, { expiresIn: 30 });
            const newRefresh = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
            yield database_1.RefreshTokenModel.create({ refresh: newRefresh, userId });
            return response
                .status(200)
                .send({ tokens: { token: newToken, refresh: newRefresh } });
        }));
    }
    catch (error) {
        return response.status(400).send("Não foi possível renovar a sessão");
    }
}));
exports.default = route;
