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
exports.SignIn = void 0;
const database_1 = require("../database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SignIn = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = request.body;
    if (!email || !password)
        return response.status(400).send("Insira todas as credenciais");
    try {
        const user = yield database_1.UserModel.findOne({ email }).exec();
        if (!user)
            return response.status(400).send("Usuário não existe");
        if (!bcrypt_1.default.compareSync(password, user === null || user === void 0 ? void 0 : user.password))
            return response.status(400).send("Senha incorreta");
        yield database_1.RefreshTokenModel.findByIdAndDelete({ userId: user._id });
        const token = jsonwebtoken_1.default.sign({
            userId: user._id,
        }, process.env.JWT_SECRET, { expiresIn: 60 });
        const refresh = jsonwebtoken_1.default.sign({
            userId: user._id,
        }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
        yield database_1.RefreshTokenModel.create({ refresh, userId: user._id });
        request.tokens = { token, refresh };
        next();
    }
    catch (error) {
        return response
            .status(400)
            .send({ message: "Não foi possível encontrar o usuário" });
    }
});
exports.SignIn = SignIn;
