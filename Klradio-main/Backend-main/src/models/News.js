const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const News = sequelize.define("News", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  source: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = News
