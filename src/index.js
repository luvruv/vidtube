/*
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";
import healthcheckRoutes from "./routes/healthcheck.routes.js";
app.use("/api", healthcheckRoutes);
dotenv.config({
    path: "./.env"
});
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connectDB()
.then(() => {
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDB connection error", err);
});
*/
import dotenv from "dotenv";
// import { app } from "./app.js"; // <-- Fix: app was not destructured
import app from "./app.js"; // ✅ default import (no { })
import connectDB from "./db/index.js";

// ❌ Remove this line below (already used in app.js)
// import healthcheckRoutes from "./routes/healthcheck.routes.js";
// app.use("/api", healthcheckRoutes); // <-- REMOVE THIS DUPLICATE ROUTE

dotenv.config({
    path: "./.env"
});

const PORT = process.env.PORT || 7000;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.log("MongoDB connection error", err);
});
