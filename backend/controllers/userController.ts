import { Request, Response } from 'express';
import User from '../models/userModel';
import { v4 as uuidv4 } from 'uuid';

//создаем пользователя
export async function createUser(req: Request, res: Response) {
  const { name, department, social } = req.body;
  const key = uuidv4();
  try {
    const user = await User.create({ key, name, department, social });
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

//получаем всех пользователей
export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

//получаем пользователя по id
export async function getOneUser(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

//обновляем пользователя по id
export async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const { name, department, social } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    //обновляем свойства пользователя
    await User.update({ name, department, social }, { where: { id } });
    const updatedUser = await User.findByPk(id);
    res.json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

//удаляем пользователя по id
export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    await user.destroy();
    res.sendStatus(204);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
