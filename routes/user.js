import express from 'express';
import {register,login,getMyDetail,logout } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();


router.get("/me",isAuthenticated,getMyDetail);
router.post("/new",register);
router.post("/login",login);
router.get("/logout",logout);

export default router;