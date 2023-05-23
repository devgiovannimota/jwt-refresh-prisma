"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenModel = exports.BlackListModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
mongoose_1.default.connect(process.env.MONGODB);
const UserScheme = new mongoose_1.default.Schema({
    email: { type: String, require },
    password: { type: String, require },
    name: { type: String, require },
});
const BlackListScheme = new mongoose_1.default.Schema({
    token: { type: String, require, expires: 60 * 5 },
});
const RefreshTokenScheme = new mongoose_1.default.Schema({
    refresh: { type: String, require },
    userId: { type: String, require },
});
UserScheme.pre("save", function (next) {
    var hash = bcrypt_1.default.hashSync(this.password, 10);
    this.password = hash;
    next();
});
exports.UserModel = mongoose_1.default.model("User", UserScheme);
exports.BlackListModel = mongoose_1.default.model("BlackList", BlackListScheme);
exports.RefreshTokenModel = mongoose_1.default.model("RefreshToken", RefreshTokenScheme);
