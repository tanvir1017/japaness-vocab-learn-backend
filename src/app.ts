import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import env from "./app/config";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import routes from "./app/routes/index";
//import routes from "./app/routes";

// ** making app variable and store it into express functions
const app: Application = express();

// ** Parser
app.use(express.json());
app.use(
  cors({
    origin: [
      env.FRONTEND_DEV_ENV01,
      env.FRONTEND_DEV_ENV02,
      env.FRONTEND_PRO_ENV,
    ],
  }),
);
app.use(cookieParser());

//** Routing
app.get("/api/v1/check", async (req, res) => {
  res
    .status(200)
    .json({ message: "Hello from the japanese language learn server!" });
});

// TODO => Using routes for whole application
app.use("/api/v1", routes);

// TODO => Global error handler Function
app.use(globalErrorHandler);

// TODO  => Not Found handler route
app.use(notFound);

export default app;
