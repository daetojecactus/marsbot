import express, { Router } from 'express';
import {
  createNode,
  getAllNodes,
  getOneNode,
  updateNode,
  deleteNode,
} from '../controllers/nodeController';

const router: Router = express.Router();

router.post('/', createNode); //создаем узел
router.get('/', getAllNodes);  //получаем все узлы
router.get('/:id', getOneNode); //получаем один узел
router.put('/:id', updateNode); //вносим изменения в узел
router.delete('/:id', deleteNode); //удаляем узел

export default router;