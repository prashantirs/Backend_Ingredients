import express from 'express';
import { getAllUsers } from '../controllers/user.js';

export const router = express.Router();

router.get('/',getAllUsers);