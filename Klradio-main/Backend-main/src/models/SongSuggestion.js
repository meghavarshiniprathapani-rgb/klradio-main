const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const SongSuggestion = sequelize.define("SongSuggestion", {
  listenerName: DataTypes.STRING,
  songTitle: DataTypes.STRING,
  movie: DataTypes.STRING
})

module.exports = SongSuggestion
