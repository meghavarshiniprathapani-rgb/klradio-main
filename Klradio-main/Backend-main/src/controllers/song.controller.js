const SongSuggestion = require("../models/SongSuggestion")

exports.submitSuggestion = async (req, res) => {
  const suggestion = await SongSuggestion.create(req.body)
  res.json(suggestion)
}

exports.getSuggestions = async (req, res) => {
  const suggestions = await SongSuggestion.findAll({
    order: [["createdAt", "ASC"]]
  })
  res.json(suggestions)
}

exports.deleteSuggestion = async (req, res) => {
  await SongSuggestion.destroy({
    where: { id: req.params.id }
  })
  res.json({ success: true })
}

exports.deleteMultipleSuggestions = async (req, res) => {
  const { ids } = req.body

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: "No song IDs provided" })
  }

  await SongSuggestion.destroy({
    where: { id: ids }
  })

  res.json({
    success: true,
    deletedIds: ids
  })
}
