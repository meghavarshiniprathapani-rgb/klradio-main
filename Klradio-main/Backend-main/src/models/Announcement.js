const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const Announcement = sequelize.define("Announcement", {
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  createdBy: DataTypes.INTEGER
})

module.exports = Announcement
