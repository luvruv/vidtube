import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { UserVideo } from "../models/video.models.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;

    const pipeline = [];

    // Filter by query if provided (search in title or description)
    if (query) {
        pipeline.push({
            $match: {
                $or: [
                    { title: { $regex: query, $options: "i" } },
                    { description: { $regex: query, $options: "i" } }
                ]
            }
        });
    }

    // Filter by user ID if provided
    if (userId) {
        pipeline.push({
            $match: {
                owner: new mongoose.Types.ObjectId(userId)
            }
        });
    }

    // Sort
    let sortCriteria = {};
    if (sortBy && sortType) {
        sortCriteria[sortBy] = sortType === "desc" ? -1 : 1;
        pipeline.push({ $sort: sortCriteria });
    } else {
        pipeline.push({ $sort: { createdAt: -1 } }); // Default sort by newest
    }

    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10)
    };

    const videos = await UserVideo.aggregatePaginate(UserVideo.aggregate(pipeline), options);

    return res.status(200).json(
        new ApiResponse(200, videos, "Videos fetched successfully")
    );
});

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if ([title, description].some(field => typeof field === "string" && field.trim() === "")) {
        throw new ApiError(400, "Title and description are required");
    }

    const videoLocalPath = req.files?.videoFile?.[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

    if (!videoLocalPath) {
        throw new ApiError(400, "Video file is required");
    }

    if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail file is required");
    }

    let videoFile;
    let thumbnail;

    try {
        videoFile = await uploadOnCloudinary(videoLocalPath);
        thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

        if (!videoFile || !videoFile.url) {
            throw new ApiError(500, "Error uploading video to Cloudinary");
        }

        if (!thumbnail || !thumbnail.url) {
            throw new ApiError(500, "Error uploading thumbnail to Cloudinary");
        }

        const newVideo = await UserVideo.create({
            title,
            description,
            videoFile: videoFile.url,
            thumbnail: thumbnail.url,
            duration: videoFile.duration || 0, // Cloudinary gives duration for videos
            owner: req.user._id
        });

        return res.status(201).json(
            new ApiResponse(201, newVideo, "Video published successfully")
        );
    } catch (error) {
        // Cleanup if something fails
        if (videoFile) await deleteFromCloudinary(videoFile.public_id);
        if (thumbnail) await deleteFromCloudinary(thumbnail.public_id);
        throw new ApiError(500, "Failed to publish video: " + error.message);
    }
});

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const video = await UserVideo.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(videoId) }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project: {
                            fullname: 1,
                            username: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                owner: { $first: "$owner" }
            }
        }
    ]);

    if (!video?.length) {
        throw new ApiError(404, "Video not found");
    }

    // Increment view count
    await UserVideo.findByIdAndUpdate(videoId, { $inc: { views: 1 } });

    return res.status(200).json(
        new ApiResponse(200, video[0], "Video fetched successfully")
    );
});

export {
    getAllVideos,
    publishAVideo,
    getVideoById
};
