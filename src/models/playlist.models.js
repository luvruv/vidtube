/*
id string pk
owner ObjectId users
videos ObjectId[] videos
name string
description string
createdAt Date
updatedAt Date
*/
import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
    name: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });

export default mongoose.model("Playlist", playlistSchema);
