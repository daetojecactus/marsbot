import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './token';

//аутентификация токенов
export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  //получаем токен из заголовка
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  //если токен отсутствует то  возвращаем статус 401
  if (!token) return res.sendStatus(401);

  try {
    //проверяем токен и добавляем данные пользователя в запрос
    const user = verifyToken(token);
    (req as any).user = user;
    next();
  } catch (error: any) {
    //если токен недействителен то 403
    res.sendStatus(403);
  }
}
