import express from "express";
import upload from "../middleware/upload.js";
import {
  createToken,
  getAllTokens,
  getTokenById,
  updateToken,
  deleteToken,
} from "../controllers/tokenController.js";

const router = express.Router();

router.post(
  "/create",
  upload.fields([
    { name: "document", maxCount: 1 },
    { name: "report", maxCount: 1 },
    { name: "tokenImage", maxCount: 1 },
    { name: "assetImage", maxCount: 1 }, // This was missing
  ]),
  createToken
);

router.get("/", getAllTokens);
router.get("/:id", getTokenById);

router.put(
  "/:id",
  upload.fields([
    { name: "document", maxCount: 1 },
    { name: "report", maxCount: 1 },
    { name: "tokenImage", maxCount: 1 },
    { name: "assetImage", maxCount: 1 }, // Add here too
  ]),
  updateToken
);

router.delete("/:id", deleteToken);

export default router;
