const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_created: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.STRING,
    references: {
      model: "users",
      key: "id",
    },
  },
  post_id: {
    type: DataTypes.STRING,
    references: {
      model: "post",
      key: "id",
    },
  },
});

module.exports = { Comment };
