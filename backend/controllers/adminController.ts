import { Request, Response } from 'express';
import Admin from '../models/adminModel';
import { generateToken } from '../auth/token';
import bcrypt from 'bcrypt';

//создаем админа
export async function createAdmin(req: Request, res: Response) {
  const { login, password, role, firstName, lastName, mail } = req.body;
  try {
    const admin = await Admin.create({
      login,
      password,
      role,
      firstName,
      lastName,
      mail,
    });
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
  const { login, password, role, firstName, lastName, mail } = req.body;
  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ error: 'Админ не найден' });
    }
    //обновляем свойства админа
    await Admin.update(
      { login, password, role, firstName, lastName, mail },
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

// //вход в систему и получение токена
// export async function loginAdmin(req: Request, res: Response) {
//   const { login, password } = req.body;
//   try {
//     //ищем админа по логину
//     const admin = await Admin.findOne({ where: { login } });
//     //проверяем существует ли админ и правильность пароля
//     if (!admin || !(await admin.checkPassword(password))) {
//       return res.status(401).json({ error: 'Неверный логин или пароль' });
//     }
//     //генерируем токен для админа
//     const token = generateToken({
//       id: admin.id,
//       login: admin.login,
//       role: admin.role,
//     });
//     //возвращаем токен
//     res.json({ token });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// }

// //сброс пароля админа
// export async function resetPassword(req: Request, res: Response) {
//   const { id } = req.params;
//   const { password } = req.body;
//   try {
//     const admin = await Admin.findByPk(id);
//     if (!admin) {
//       return res.status(404).json({ error: 'Админ не найден' });
//     }
//     //хэшируем новый пароль
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     //обновляем пароль админа
//     await Admin.update({ password: hashedPassword }, { where: { id } });
//     res.json({ message: 'Пароль успешно изменен' });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// }
