import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGODB as string);

const UserScheme = new mongoose.Schema({
  email: { type: String, require },
  password: { type: String, require },
  name: { type: String, require },
});
const BlackListScheme = new mongoose.Schema({
  token: { type: String, require, expires: 60 * 5 },
});
const RefreshTokenScheme = new mongoose.Schema({
  refresh: { type: String, require },
  userId: { type: String, require },
});

UserScheme.pre("save", function (next) {
  var hash = bcrypt.hashSync(this.password as string, 10);
  this.password = hash;
  next();
});

export const UserModel = mongoose.model("User", UserScheme);
export const BlackListModel = mongoose.model("BlackList", BlackListScheme);
export const RefreshTokenModel = mongoose.model(
  "RefreshToken",
  RefreshTokenScheme
);
