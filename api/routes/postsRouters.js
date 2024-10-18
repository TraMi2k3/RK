import express from "express";
import { createPost, deletePost, getAllPosts, getPostById, updatedPost } from "../controllers/postsController.js";

const postRouter = express.Router();

postRouter.get("/", getAllPosts);
postRouter.get("/:id", getPostById);
postRouter.post("/", createPost)
postRouter.put("/:id", updatedPost)
postRouter.delete("/:id", deletePost)

export default postRouter;