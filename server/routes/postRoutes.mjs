import express from "express";
import authJwt from "../middlewares/authJwt.mjs";
import { addPost, getNextPosts } from "../controllers/postController.mjs";

const router = express.Router();

router.post("/addpost", authJwt.verifyToken, addPost);

router.get("/getnextposts/:pageNumber/:limit", authJwt.verifyToken, getNextPosts);

export default router;