const Script = require("../models/Script")

exports.createScript = async (req, res) => {
  const script = await Script.create({
    title: req.body.title,
    content: req.body.content,
    createdBy: req.user.id
  })
  res.json(script)
}

exports.getScripts = async (req, res) => {
  const scripts = await Script.findAll({
    order: [["updatedAt", "DESC"]]
  })
  res.json(scripts)
}

exports.updateScript = async (req, res) => {
  await Script.update(req.body, {
    where: { id: req.params.id }
  })
  const updated = await Script.findByPk(req.params.id)
  res.json(updated)
}

exports.deleteScript = async (req, res) => {
  await Script.destroy({ where: { id: req.params.id } })
  res.json({ success: true })
}

exports.setLiveScript = async (req, res) => {
  await Script.update({ isLive: false }, { where: {} })
  await Script.update(
    { isLive: true },
    { where: { id: req.params.id } }
  )
  const live = await Script.findByPk(req.params.id)
  res.json(live)
}

exports.getLiveScript = async (req, res) => {
  const script = await Script.findOne({ where: { isLive: true } })
  res.json(script)
}
