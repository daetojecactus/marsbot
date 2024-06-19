import express, { Router } from 'express';
import {
  createAdmin,
  getAllAdmins,
  getOneAdmin,
  updateAdmin,
  deleteAdmin,
} from '../controllers/adminController';

const router: Router = express.Router();

router.post('/', createAdmin); //создаем админа
router.get('/', getAllAdmins);  //получаем всех админов
router.get('/:id', getOneAdmin); //получаем одного админа
router.put('/:id', updateAdmin); //вносим изменения админа
router.delete('/:id', deleteAdmin); //удаляем админа

export default router;