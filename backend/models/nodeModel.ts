import { sequelize } from '../db';
import { DataTypes } from 'sequelize';

// Определение модели Node
const Node = sequelize.define(
  'Node',
  {
    //id 
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    //текст узла (вопроса или ответа)
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //ссылается на id родительского узла
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'nodes', //таблица на которую ссылается parentId
        key: 'id',
      },
    },
    //для типп узла (вопрос или ответ)
    type: {
      type: DataTypes.ENUM('question', 'answer'),
      allowNull: false,
    },
  },
  {
    tableName: 'nodes', //имя таблицы в бд
    timestamps: true,  //автоматическое добавление createdAt и updatedAt
  },
);

//определение связей между узлами

//каждый узел может иметь только одного родителя
Node.belongsTo(Node, { as: 'parent', foreignKey: 'parentId' });
//каждый узел может иметь несколько дочерних узлов
Node.hasMany(Node, { as: 'children', foreignKey: 'parentId' });

export default Node;
