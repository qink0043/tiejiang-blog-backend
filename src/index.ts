import "reflect-metadata";
import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { AppDataSource } from "./config/data-source";
import { errorHandler } from "./middlewares/error-handler";
import logger from "./utils/logger";

// Route Imports
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import categoryRoutes from "./routes/category.routes";
import tagRoutes from "./routes/tag.routes";
import commentRoutes from "./routes/comment.routes";
import uploadRoutes from "./routes/upload.routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Static files for uploaded images
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/upload", uploadRoutes);

// Error Handling
app.use(errorHandler);

// Database Connection and Server Start
AppDataSource.initialize()
  .then(() => {
    logger.info("Database connected successfully");
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  })
  .catch((error: any) => {
    logger.error("Database connection failed: %O", error);
  });
