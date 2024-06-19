import { sequelize } from '../db';
import { DataTypes } from 'sequelize';

const Admin = sequelize.define(
  'Admin',
  {
    //id
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    //логин
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    //пароль
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //роль админа для распределения прав
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    //имя админа
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //аватарка (фото)
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'admins', //имя таблицы в бд
    timestamps: true, //автоматическое добавление createdAt и updatedAt
  },
);

export default Admin;
