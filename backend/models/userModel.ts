import { sequelize } from '../db';
import { DataTypes } from 'sequelize';

const User = sequelize.define(
  'User',
  {
    //id
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    //уникальный ключ пользователя
    key: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    //имя пользователя
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //его отдел
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //соц сети
    social: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'users', //имя таблицы в бд
    timestamps: true, //автоматическое добавление createdAt и updatedAt
  },
);

export default User;
