import express from 'express';
import { getUserProfile, loginUser, registerUser } from '../controllers/UserController.js';
import { protect } from '../middleware/authMiddlewares.js';

const userRouter= express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", protect,getUserProfile);


export default userRouter;