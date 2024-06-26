import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './token';

//аутентификация токенов
export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); //401 если токен отсутствует
  }

  try {
    const admin = verifyToken(token);
    (req as any).admin = admin;
    next();
  } catch (error: any) {
    if (error.message === 'Token expired') {
      return res.sendStatus(403); //отправляем 403 если токен истек
    }
    return res.sendStatus(403);
  }
}
