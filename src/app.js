/*
import express from "express";
import cors from "cors";
const app = express();
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);
// common middle ware
app.use(express.json({limit: "18kb"}));
app.use(express.urlencoded({ extended: true, limit: "18kb" }));
app.use(express.static("public"));
// import routes
import healthcheckRouter from "./routes/healthcheck.routes.js";
// routes
app.use("/api/v1/healthcheck", healthcheckRouter);
export { app };
*/
/*
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import healthcheckRoutes from "./routes/healthcheck.routes.js";
import userRouter from "./routes/user.routes.js";
// import { error } from "winston";
import winston from "winston";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express(); // ✅

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/v1/healthcheck", healthcheckRoutes);
app.use("/api/v1/users", userRouter);
app.use(errorHandler);
// export app correctly
export default app; // ✅ Use "default" export
*/
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import healthcheckRoutes from "./routes/healthcheck.routes.js";
import userRouter from "./routes/user.routes.js";
// import { error } from "winston";
import winston from "winston";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express(); // ✅

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/v1/healthcheck", healthcheckRoutes);
app.use("/api/v1/users", userRouter);
app.use(errorHandler);

// export app correctly
export default app; // ✅ Use "default" export
