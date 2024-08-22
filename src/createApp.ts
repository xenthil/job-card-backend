import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

import JoTypeRouter from "./routes/JoTypeRouter";
import Unit from "./routes/Unit";
import AuthRoute from "./routes/Auth";
import ClientRoute from "./routes/Client";
import material from "./routes/Material";
import commonRoute from "./routes/Common";
import materialInwardRoute from "./routes/materialInward";

declare global {
  var __uploadDir: string;
  var __srcDir: string;
}
export function createApp() {
  const app = express();
  global.__uploadDir = __dirname + "/uploads";
  global.__srcDir = __dirname;
  
  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(compression());
  app.use(cookieParser());
  app.use(express.static(__uploadDir + "/materialInward"));
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


  app.use("/api/auth", AuthRoute);
  app.use("/api/client", ClientRoute);
  app.use("/api/unit", Unit);
  app.use("/api/materials", material);
  app.use("/api/JoTypeRouter", JoTypeRouter);
  app.use("/api/common", commonRoute);
  app.use("/api/materialInward", materialInwardRoute);

  return app;
}
