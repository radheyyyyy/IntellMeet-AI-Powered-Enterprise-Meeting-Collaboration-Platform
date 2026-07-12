/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
*/

import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

/*
|--------------------------------------------------------------------------
| Route Imports
|--------------------------------------------------------------------------
*/

import authRoutes from "./routes/auth.routes.js";
import testRoutes from "./routes/test.routes.js";
import teamRoutes from "./routes/team.routes.js";
import meetingRoutes from "./routes/meeting.routes.js";
import messageRoutes from "./routes/message.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import taskRoutes from "./routes/task.routes.js";
import fileRoutes from "./routes/file.routes.js";
import meetingAiRoutes from "./routes/meetingAi.routes.js";
import boardRoutes from "./routes/board.routes.js";
import recordingRoutes from "./routes/recording.routes.js";

/*
|--------------------------------------------------------------------------
| Middleware Imports
|--------------------------------------------------------------------------
*/

import errorMiddleware from "./middlewares/error.middleware.js";

/*
|--------------------------------------------------------------------------
| App Initialization
|--------------------------------------------------------------------------
*/

const app = express();

/*
|--------------------------------------------------------------------------
| Security Middleware
|--------------------------------------------------------------------------
*/

app.use(helmet());

app.use(
  cors({
    origin:
      process.env.CLIENT_URL,

    credentials: true,
  })
);

app.use(compression());

app.use(cookieParser());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/*
|--------------------------------------------------------------------------
| Static Files
|--------------------------------------------------------------------------
*/

app.use(
  "/uploads",
  express.static("uploads")
);

/*
|--------------------------------------------------------------------------
| Rate Limiter
|--------------------------------------------------------------------------
*/

const limiter =
  rateLimit({
    windowMs:
      15 * 60 * 1000,

    max: 100,

    message:
      "Too many requests. Please try again later.",
  });

app.use(
  "/api",
  limiter
);

/*
|--------------------------------------------------------------------------
| Health Check Route
|--------------------------------------------------------------------------
*/

app.get(
  "/",
  (req, res) => {

    res.status(200).json({
      success: true,
      message:
        "IntellMeet Backend Running 🚀",
    });

  }
);

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/test",
  testRoutes
);

app.use(
  "/api/teams",
  teamRoutes
);

app.use(
  "/api/meetings",
  meetingRoutes
);

app.use(
  "/api/messages",
  messageRoutes
);

app.use(
  "/api/notifications",
  notificationRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);

app.use(
  "/api/files",
  fileRoutes
);

app.use(
  "/api/ai/meetings",
  meetingAiRoutes
);

app.use(
  "/api/boards",
  boardRoutes
);

app.use(
  "/api/recordings",
  recordingRoutes
);

/*
|--------------------------------------------------------------------------
| Error Handling Middleware
|--------------------------------------------------------------------------
*/

app.use(
  errorMiddleware
);

/*
|--------------------------------------------------------------------------
| Export App
|--------------------------------------------------------------------------
*/

export default app;
