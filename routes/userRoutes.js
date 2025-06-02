import express from "express"
import { registerUser, loginUser, changePassword } from "../controllers/userControllers.js"
import protect from "../middleware/authMiddleware.js";

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const router = express.Router()

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/change-password", protect, changePassword);

export default router