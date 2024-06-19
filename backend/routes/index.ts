import express from 'express';
import userRoutes from './userRoutes';
import adminRoutes from './adminRoutes'
import nodeRoutes from './nodeRoutes'

const router = express.Router();

router.use('/user', userRoutes); //пользователи
router.use('/admin', adminRoutes) //админы
router.use('/node', nodeRoutes) //узлы

export default router;