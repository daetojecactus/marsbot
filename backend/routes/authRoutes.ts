import express, { Router } from 'express';
import {
    loginAdmin,
    resetPassword
} from '../controllers/authController';
import { authenticateToken } from '../auth/check';

const router: Router = express.Router();

router.post('/', authenticateToken, loginAdmin); //логин
router.put('/:id', authenticateToken, resetPassword);  //сброс паролдя у админа

export default router;