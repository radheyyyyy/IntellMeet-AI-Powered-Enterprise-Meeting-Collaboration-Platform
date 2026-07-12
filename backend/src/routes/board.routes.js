import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import {
  addColumnController,
  createBoardController,
  getBoardController,
  getTeamBoardsController
} from "../controllers/board.controller.js";

const router = express.Router();

router.post("/", authenticate, authorize("MANAGER", "ADMIN", "SUPER_ADMIN"), createBoardController);
router.get("/team/:teamId", authenticate, getTeamBoardsController);
router.get("/:id", authenticate, getBoardController);
router.post("/:id/columns", authenticate, authorize("MANAGER", "ADMIN", "SUPER_ADMIN"), addColumnController);

export default router;
