/*
import { Router } from "express";
import { healthcheck } from "../controllers/healthcheckcontroller.js";
const router = Router;
// /api/v1/healthcheck/test
router.route("/").get(healthcheck);
// router.route("/test").get(healthcheck);
export default router;
*/

/* 
import { Router } from "express";
import { healthcheck } from "../controllers/healthcheckcontroller.js";
const router = Router();
router.route("/").get(healthcheck);
export default router;
*/

/*
import express from "express";
import { healthcheck } from "../controllers/healthcheckcontroller.js";
const router = express.Router();
router.get("/healthcheck", healthcheck);
export default router;
*/

import { Router } from "express";
import { healthcheck } from "../controllers/healthcheckcontroller.js";
const router = Router(); // <-- Fix: add ()
router.route("/").get(healthcheck);

export default router;
