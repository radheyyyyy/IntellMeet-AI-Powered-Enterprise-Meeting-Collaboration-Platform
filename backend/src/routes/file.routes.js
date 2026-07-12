import express from "express";

import {
  uploadFileController,
  getFilesController,
  getFileController,
  deleteFileController,
} from "../controllers/file.controller.js";

import authenticate
  from "../middlewares/auth.middleware.js";

import {
  upload,
} from "../config/multer.js";

const router =
  express.Router();

router.post(
  "/upload",
  authenticate,
  upload.single("file"),
  uploadFileController
);

router.get(
  "/",
  authenticate,
  getFilesController
);

router.get(
  "/:id",
  authenticate,
  getFileController
);

router.delete(
  "/:id",
  authenticate,
  deleteFileController
);

export default router;