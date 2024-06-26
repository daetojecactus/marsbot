import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET_KEY || '';
const tokenExpiration = '8h'; //срок жизни токена

//генерация токена
export function generateToken(admin: {
  id: number;
  login: string;
  role: number;
}) {
  return jwt.sign(admin, secret, { expiresIn: tokenExpiration });
}

//проверка токена
export function verifyToken(token: string): jwt.JwtPayload {
  try {
    return jwt.verify(token, secret) as jwt.JwtPayload;
  } catch (error) {
    throw new Error('Token expired'); //обработка истекшего токена
  }
}
