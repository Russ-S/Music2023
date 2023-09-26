import express from "express";
import {
  getComposers,
  getLabels,
  getMedia,
  getCategories,
} from "../controllers/lists.js";

const router = express.Router();

router.get("/composers", getComposers);
router.get("/labels", getLabels);
router.get("/media", getMedia);
router.get("/categories", getCategories);

export default router;
