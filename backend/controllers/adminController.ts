import { Request, Response } from 'express';
import Admin from '../models/adminModel';

//создаем админа
export async function createAdmin(req: Request, res: Response) {
  const { login, password, role, name, avatar } = req.body;
  try {
    const admin = await Admin.create({ login, password, role, name, avatar });
    res.json(admin);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

//получаем всех админов
export async function getAllAdmins(req: Request, res: Response) {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

//получаем админа по id
export async function getOneAdmin(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ error: 'Админ не найден' });
    }
    res.json(admin);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

//обновляем админа по id
export async function updateAdmin(req: Request, res: Response) {
  const { id } = req.params;
  const { login, password, role, name, avatar } = req.body;
  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ error: 'Админ не найден' });
    }
    //обновляем свойства админа
    await Admin.update(
      { login, password, role, name, avatar },
      { where: { id } },
    );
    const updateAdmin = await Admin.findByPk(id);
    res.json(updateAdmin);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

//удаляем админа по id
export async function deleteAdmin(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ error: 'Админ не найден' });
    }
    await admin.destroy();
    res.sendStatus(204);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
