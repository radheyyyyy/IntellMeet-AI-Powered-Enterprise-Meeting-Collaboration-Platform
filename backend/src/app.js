import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
// import mongoSanitize from "express-mongo-sanitize";
import authRoutes from "./routes/auth.routes.js";
import meetingRoutes from "./routes/meeting.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

/*
|--------------------------------------------------------------------------
| Security Middleware
|--------------------------------------------------------------------------
*/

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

app.use(compression());

app.use(cookieParser());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

// app.use(mongoSanitize());

/*
|--------------------------------------------------------------------------
| Rate Limiter
|--------------------------------------------------------------------------
*/

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    "Too many requests. Please try again later."
});

app.use("/api", limiter);

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "IntellMeet Backend Running 🚀"
  });
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| All application routes are registered here.
| Every module should expose its own router.
|
*/

app.use("/api/auth", authRoutes);
/*
|--------------------------------------------------------------------------
| Error Handler
|--------------------------------------------------------------------------
*/

app.use(errorMiddleware);

import testRoutes from "./routes/test.routes.js";
app.use("/api/test", testRoutes);


import teamRoutes
from "./routes/team.routes.js";
app.use(
  "/api/teams",
  teamRoutes
);

export default app;

app.use(
  "/api/meetings",
  meetingRoutes
);