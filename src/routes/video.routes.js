import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllVideos, publishAVideo, getVideoById } from "../controllers/video.controllers.js";

const router = Router();

// Apply verifyJWT to all video routes if you want strict protection.
// Alternatively, keep some routes open (like GET all videos and GET video by ID)
// and protect upload/modifying routes.

router.route("/")
    .get(getAllVideos)  // public: get all paginated videos
    .post(
        verifyJWT, 
        upload.fields([
            { name: "videoFile", maxCount: 1 },
            { name: "thumbnail", maxCount: 1 }
        ]),
        publishAVideo // protected: upload new video
    );

router.route("/:videoId").get(getVideoById); // public: get single video

export default router;
