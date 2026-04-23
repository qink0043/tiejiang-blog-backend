import { Router } from "express";
import multer from "multer";
import path from "path";
import { AppResponse } from "../utils/response";

const router = Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `doodle_${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json(AppResponse.error("No file uploaded"));
  }
  const imageUrl = `https:tiejiang.site/uploads_images/${req.file.filename}`;
  res.json(AppResponse.success({ imageUrl }));
});

export default router;
