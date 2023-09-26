import express from "express";
import { getRecordings, getPerformances } from "../controllers/client.js";

const router = express.Router();

router.get("/recordings", getRecordings);
router.get("/performances", getPerformances);

export default router;
