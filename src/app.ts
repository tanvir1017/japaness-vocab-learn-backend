import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import corsOptions from "./app/config/corsOption";
import credentials from "./app/middleware/credential";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import routes from "./app/routes/index";
//import routes from "./app/routes";

// ** making app variable and store it into express functions
const app: Application = express();

// ** Parser
app.use(express.json());

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//** Routing
app.get("/api/v1/check", async (req, res) => {
  res.status(200).json({ message: "Hello from the Vocabulary learn server!" });
});

app.get("/", async (req, res) => {
  res.status(200).json({ message: "こんにちは" });
});

// TODO => Using routes for whole application
app.use("/api/v1", routes);

// TODO => Global error handler Function
app.use(globalErrorHandler);

// TODO  => Not Found handler route
app.use(notFound);

export default app;
