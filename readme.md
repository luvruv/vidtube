# VIDTUBE API

A robust, production-ready backend API inspired by YouTube. This project provides a fully-featured REST API for video streaming and user management, built with a modern Express/Node.js stack and a MongoDB database.

## 🚀 Features
- **User Authentication**: Secure JWT-based registration, login, and token refreshing.
- **Video Management**: Secure, paginated video endpoints handling direct file uploads to Cloudinary.
- **Media Optimization**: Integrated high-performance secure multimedia streaming relying on Cloudinary CDNs.
- **State-of-the-Art Security**: Global strict middlewares including Helmet headers, Express Rate Limiter, and Mongo Sanitize protections to shield against DDoS or NoSQL injections.
- **MVC Architecture**: Codebase is modularized efficiently into controllers, routes, models, and middleware.

## 💻 Tech Stack
- **Node.js** & **Express**
- **MongoDB** & **Mongoose**
- **Cloudinary** & **Multer** for cloud asset storage and media validation
- **JWT** (JSON Web Tokens) & **Bcrypt**
- **Helmet**, **CORS**, **Rate Limit** for security.

## 📦 Folder Structure

```
vidtube/
├── public/                 # Static assets & temporary file storage
├── src/
│   ├── app.js              # Express app config (security middlewares & routes)
│   ├── index.js            # Database connection & server entrypoint
│   ├── controllers/        # Route logic & implementations
│   ├── db/                 # Database connection utilities
│   ├── middlewares/        # Security headers, Multer integration, and global Error Handler
│   ├── models/             # Mongoose Schemas (User, Video, etc.)
│   ├── routes/             # API definition (e.g., user.routes.js, video.routes.js)
│   └── utils/              # AsyncHandlers, ApiResponses, Cloudinary Helpers
└── .env                    # Environment configuration
```

## 🛠️ Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd VIDTUBE
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Duplicate the `.env.sample` file and rename it to `.env`. Fill in your secrets.
   ```bash
   cp .env.sample .env
   ```

4. **Start the server:**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 🔌 Core API Endpoints

### Healthcheck
- `GET /api/v1/healthcheck` : Check server operational status.

### Users (`/api/v1/users`)
- `POST /register` : Create a new user account with an avatar and optional cover image.
- `POST /login` : Authenticate user & grant JWT access tokens.
- `POST /logout` : (Protected) Clear authentication tokens safely.
- `GET /c/:username` : (Protected) Fetch a user/channel profile.

### Videos (`/api/v1/videos`)
- `GET /` : Fetch paginated array of all video metadata.
- `GET /:videoId` : Fetch video tracking and single metadata object.
- `POST /` : (Protected) Secure file upload pipeline pushing new videos & thumbnails up to Cloudinary.

## 🗺️ Roadmap & Future Enhancements

- [ ] **Comments & Likes system**: Model the relationship of likes directly to videos and comments.
- [ ] **Subscriptions**: Track user subscription ecosystems and personalized content feed algorithms.
- [ ] **Transcoding via local node.js buffer**: Optional fallback to HTTP 206 chunk-based direct node buffer streaming instead of raw CDN delivery.
- [ ] **Search Auto-Complete Suggestions**: Add fuzzy-search endpoints to the Video querying controller.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📜 License
ISC
