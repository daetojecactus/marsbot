import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.DB_NAME || ''; //название бд
const dbUser = process.env.DB_USER || ''; //пользователь
const dbPassword = process.env.DB_PASSWORD || ''; //пароль
const dbHost = process.env.DB_HOST || ''; //хост бд
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432; //порт

console.log(dbName)

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    dialect: 'postgres',
    host: dbHost,
    port: dbPort,
  });
