import express from "express";
import multer from "multer";
import {
  getAllProjects,
  getProjectsOnGoing,
  uploadProject,
} from "../controllers/projectController.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/uploadproject", upload.single("projectFile"), uploadProject);

router.post("/getprojects", getProjectsOnGoing);

router.get("/getproject/:id", getAllProjects);

export default router;
