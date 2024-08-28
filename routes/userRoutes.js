import express from "express";
import {
  registerUser,
  loginUser,
  getUserInfo,
  updateUserInfo,
  updateUserImg,
  sendVerificationLink,
} from "../controllers/userController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";
import { verifyEmail } from "../helpers/sendVerifyEmail.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "/public/userImages"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

//Sign-up User as well as Mentor
router.post("/register", registerUser);
router.post("/login", loginUser);

//getting the data of the user
router.get("/users/:id", requireSignIn, getUserInfo);

//updating the data of the user
router.get("/userupdate/:id", upload.single("image"), updateUserInfo);

//updating image of the user
router.get("/userimage/:id", updateUserImg);

router.get("/verify", verifyEmail);

router.post("/verification", sendVerificationLink);

export default router;
