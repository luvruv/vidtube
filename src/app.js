import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import healthcheckRoutes from "./routes/healthcheck.routes.js";
import userRouter from "./routes/user.routes.js";
import videoRouter from "./routes/video.routes.js";
import winston from "winston";
import { errorHandler } from "./middlewares/error.middleware.js";

// Security Middlewares
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

const app = express();

// Secure HTTP headers
app.use(helmet());

// Rate Limiting to prevent brute-force and DDoS
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 1000 requests per `window`
    standardHeaders: true, 
    legacyHeaders: false,
    message: "Too many requests from this IP, please try again later."
});
app.use("/api", limiter);

// CORS Config
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parsers & Security
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(mongoSanitize()); // Prevent NoSQL Injection
app.use(cookieParser());
app.use(express.static("public")); // Static Serve

// Routes Definition
app.use("/api/v1/healthcheck", healthcheckRoutes);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);

// Global Error Handler
app.use(errorHandler);

export default app;
