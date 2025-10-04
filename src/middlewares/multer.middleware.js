/*
import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        // TODO for users change file name
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
    }
})
export const upload = multer({
    storage
})
*/
/* 
import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './public/temp');
    },
    filename: function (req, file, cb) {
    // ✅ TODO: Customize filename using user data or file type if needed
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // Get original file extension (e.g. .jpg, .mp4)
    const ext = path.extname(file.originalname);
    // Get base name without extension
    const nameWithoutExt = path.basename(file.originalname, ext);
    // Example: my-video_1721834028392-123456789.mp4
    cb(null, `${nameWithoutExt}_${uniqueSuffix}${ext}`);
    }
});
export const upload = multer({ storage });
*/
/* 
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/temp"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        const nameWithoutExt = path.basename(file.originalname, ext);
        cb(null, `${nameWithoutExt}_${uniqueSuffix}${ext}`);
    }
});
export const upload = multer({ storage });
*/
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/temp"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        const nameWithoutExt = path.basename(file.originalname, ext);
        cb(null, `${nameWithoutExt}_${uniqueSuffix}${ext}`);
    }
});
export const upload = multer({ storage });
