const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const PodcastScript = sequelize.define("PodcastScript", {
  title: DataTypes.STRING,
  topic: DataTypes.STRING,
  content: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM("draft", "recording", "completed"),
    defaultValue: "draft"
  }
})

module.exports = PodcastScript
