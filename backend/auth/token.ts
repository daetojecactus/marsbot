import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

//cекретный ключ для подписи jwt
const secret = process.env.SECRET_KEY || '';

//генерация токена
export function generateToken(admin: {
  id: number;
  login: string;
  role: number;
}) {
  return jwt.sign(admin, secret, { expiresIn: '1h' });
}

//проверка токена
export function verifyToken(token: string) {
  return jwt.verify(token, secret);
}
