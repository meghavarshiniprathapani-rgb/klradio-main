const News = require("../models/News")

exports.createNews = async (req, res) => {
  const { title, content, source } = req.body
  const news = await News.create({ title, content, source })
  res.status(201).json(news)
}

exports.getAllNews = async (req, res) => {
  const news = await News.findAll({
    order: [["createdAt", "DESC"]]
  })
  res.json(news)
}

exports.updateNews = async (req, res) => {
  const { title, content, source } = req.body
  const news = await News.findByPk(req.params.id)
  if (!news) return res.status(404).json({ message: "News not found" })
  await news.update({ title, content, source })
  res.json(news)
}

exports.deleteNews = async (req, res) => {
  const news = await News.findByPk(req.params.id)
  if (!news) return res.status(404).json({ message: "News not found" })
  await news.destroy()
  res.json({ success: true })
}
