const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const Script = sequelize.define("Script", {
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  isLive: { type: DataTypes.BOOLEAN, defaultValue: false },
  createdBy: DataTypes.INTEGER
})

module.exports = Script
