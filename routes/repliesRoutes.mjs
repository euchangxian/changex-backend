import express from "express";
import authJwt from "../middlewares/authJwt.mjs";
import { addReply, getReplies } from "../controllers/repliesController.mjs";

const router = express.Router();

router.post("/addreply", authJwt.verifyToken, addReply);

router.get("/getreplies/:postId", authJwt.verifyToken, getReplies);

export default router;
