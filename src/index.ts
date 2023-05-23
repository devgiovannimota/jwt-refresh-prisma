import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";

import allow from "./routes/allow";
import restrict from "./routes/restrict";
import refresh from "./routes/refresh";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use(allow, refresh, restrict);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
