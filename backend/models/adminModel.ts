import { sequelize } from '../db';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

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
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //фамилия админа
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //почта
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'admins', //имя таблицы в бд
    timestamps: true, //автоматическое добавление createdAt и updatedAt
    //хуки для хэширования паролей перед сохранением
    hooks: {
      beforeCreate: async (admin: any) => {
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);
      },
      beforeUpdate: async (admin: any) => {
        if (admin.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          admin.password = await bcrypt.hash(admin.password, salt);
        }
      },
    },
  },
);


export default Admin;
