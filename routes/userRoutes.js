import express from "express"
import { registerUser, loginUser } from "../controllers/userControllers.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const router = express.Router()

router.post("/register", registerUser);
router.post("/login", loginUser);


export default router