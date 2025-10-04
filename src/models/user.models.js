/*
id string pk
username string
email string
fullName string
avatar string
coverImage string
watchHistory ObjectId() videos
password string
refreshToken string
createdAt Date
updatedAt Date
*/
import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
// import { JsonWebTokenError } from "jsonwebtoken";
import pkg from "jsonwebtoken";
const { sign, verify, JsonWebTokenError } = pkg;
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, // cloudinary URL
            required: true,
        },
        coverImage: {
            type: String, // cloudinary URL
            required: true,
        },
        watchHistory: {
            type: Schema.Types.ObjectId,
            ref: "Video",
        },
        password: {
            type: String,
            required: [true, "Pasword is Required"]
        },
        refreshToken: {
            type: String
        }
    }, 
    { timestamps: true}
)
/* 
userSchema.pre("save", async function (next) {
    if(this.isModified("pasword")) return next();
    this.password = bcrypt.hash(this.password, 10);
    next();
})
userSchema.methods.isPasswordCorrect = async function (next) {
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateAccessToken = function () {
    // short lived access token
    return jwt.sign({ 
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    }, 
    process.env.ACCESS_TOKEN_SERET, 
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
}
userSchema.methods.generateRefreshToken = function () {
    // short lived access token
    return jwt.sign({ 
        _id: this._id,
    }, 
    process.env.REFRESH_TOKEN_SERET, 
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
}
export const User = mongoose.model("User", userSchema);
*/
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10); // ✅ fix missing await
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password); // ✅ use param
};

userSchema.methods.generateAccessToken = function () {
    return sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
};

userSchema.methods.generateRefreshToken = function () {
    return sign({
        _id: this._id
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
};
export default mongoose.model("User", userSchema); // ✅ default export
