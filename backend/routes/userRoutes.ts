import express, { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';

const router: Router = express.Router();

router.post('/', createUser); //создаем пользователя
router.get('/', getAllUsers); //получаем всех пользователей
router.get('/:id', getOneUser); //получаем одного пользователя
router.put('/:id', updateUser); //вносим изменения пользователя
router.delete('/:id', deleteUser); //удаляем пользователя

export default router;
