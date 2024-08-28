import express from "express";
import { uploadDocumentation } from "../controllers/documentController.js";

const router = express.Router();

router.post("/uploadDocument", uploadDocumentation);

export default router;
