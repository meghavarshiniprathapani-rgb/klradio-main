const User = require("../models/User")
const Script = require("../models/Script")
const Announcement = require("../models/Announcement")
const News = require("../models/News")
const PodcastScript = require("../models/PodcastScript")
const SongSuggestion = require("../models/SongSuggestion")

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: ["id", "username", "role", "createdAt"]
  })
  res.json(users)
}

exports.deleteUser = async (req, res) => {
  const { id } = req.params
  await User.destroy({ where: { id } })
  res.json({ message: "User deleted" })
}

exports.getAllScripts = async (req, res) => {
  const scripts = await Script.findAll({ order: [["createdAt", "DESC"]] })
  res.json(scripts)
}

exports.setLiveScript = async (req, res) => {
  const { id } = req.params
  await Script.update({ isLive: false }, { where: {} })
  await Script.update({ isLive: true }, { where: { id } })
  res.json({ message: "Live script updated" })
}

exports.getAllAnnouncements = async (req, res) => {
  const announcements = await Announcement.findAll({ order: [["createdAt", "DESC"]] })
  res.json(announcements)
}

exports.getAllNews = async (req, res) => {
  const news = await News.findAll({ order: [["createdAt", "DESC"]] })
  res.json(news)
}

exports.setLiveNews = async (req, res) => {
  const { id } = req.params
  await News.update({ isLive: false }, { where: {} })
  await News.update({ isLive: true }, { where: { id } })
  res.json({ message: "Live news updated" })
}

exports.getAllPodcasts = async (req, res) => {
  const podcasts = await PodcastScript.findAll({ order: [["createdAt", "DESC"]] })
  res.json(podcasts)
}

exports.setLivePodcast = async (req, res) => {
  const { id } = req.params
  await PodcastScript.update({ isLive: false }, { where: {} })
  await PodcastScript.update({ isLive: true }, { where: { id } })
  res.json({ message: "Live podcast updated" })
}

exports.getSongSuggestions = async (req, res) => {
  const suggestions = await SongSuggestion.findAll({ order: [["createdAt", "DESC"]] })
  res.json(suggestions)
}

exports.bulkDeleteSongSuggestions = async (req, res) => {
  const { ids } = req.body
  await SongSuggestion.destroy({ where: { id: ids } })
  res.json({ message: "Selected song suggestions deleted" })
}
