import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

import JobTypeRouter from "./routes/jobType";
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

  const CLIENT_URLS = [
    "http://localhost:3000",
    "http://job-card-zaara.s3-website.ap-south-1.amazonaws.com",
    "https://job-card-frontend-ruby.vercel.app",
    "https://job-card-indol.vercel.app",
    "https://job-card-frontend-oeiowjygx-xenthils-projects.vercel.app"
  ];

  /*app.use(cors({
    origin: (origin, callback) => {
      try {
        if (
          !origin ||
          CLIENT_URLS.includes(origin) ||
          /\.vercel\.app$/.test(new URL(origin).hostname)
        ) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      } catch (err) {
        callback(new Error('CORS origin check failed'));
      }
    },
    credentials: true,
  }));*/

  app.use(cors());  
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(compression());
  app.use(express.static(__uploadDir + "/materialInward"));
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


  app.use("/api/auth", AuthRoute);
  app.use("/api/client", ClientRoute);
  app.use("/api/unit", Unit);
  app.use("/api/materials", material);
  app.use("/api/jobType", JobTypeRouter);
  app.use("/api/common", commonRoute);
  app.use("/api/materialInward", materialInwardRoute);

  return app;
}
