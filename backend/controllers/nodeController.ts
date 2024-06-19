import { Request, Response } from 'express';
import Node from '../models/nodeModel';

//создаем узел
export async function createNode(req: Request, res: Response) {
  const { text, parentId, type } = req.body;
  try {
    const node = await Node.create({ text, parentId, type });
    res.json(node);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

//получаем все узлы
export async function getAllNodes(req: Request, res: Response) {
  try {
    const nodes = await Node.findAll();
    res.json(nodes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

//получаем узел по id
export async function getOneNode(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const node = await Node.findByPk(id, { include: ['children'] });
    if (!node) {
      return res.status(404).json({ error: 'Узел не найден' });
    }
    res.json(node);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

//обновляем узел по id
export async function updateNode(req: Request, res: Response) {
  const { id } = req.params;
  const { text, parentId, type } = req.body;
  try {
    const node = await Node.findByPk(id);
    if (!node) {
      return res.status(404).json({ error: 'Узел не найден' });
    }
    //обновляем свойства узла
    await Node.update({ text, parentId, type }, { where: { id } });
    const updatedNode = await Node.findByPk(id, { include: ['children'] });
    res.json(updatedNode);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

//удаляем узел по id
export async function deleteNode(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const node = await Node.findByPk(id);
    if (!node) {
      return res.status(404).json({ error: 'Узел не найден' });
    }
    await node.destroy();
    res.sendStatus(204);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
