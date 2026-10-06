const Announcement = require("../models/Announcement")

exports.createAnnouncement = async (req, res) => {
  const announcement = await Announcement.create({
    title: req.body.title,
    content: req.body.content,
    createdBy: req.user.id
  })
  res.json(announcement)
}

exports.getAnnouncements = async (req, res) => {
  const announcements = await Announcement.findAll({
    order: [["createdAt", "DESC"]]
  })
  res.json(announcements)
}

exports.updateAnnouncement = async (req, res) => {
  await Announcement.update(req.body, {
    where: { id: req.params.id }
  })
  const updated = await Announcement.findByPk(req.params.id)
  res.json(updated)
}

exports.deleteAnnouncement = async (req, res) => {
  await Announcement.destroy({ where: { id: req.params.id } })
  res.json({ success: true })
}

exports.getPublicAnnouncements = async (req, res) => {
  const announcements = await Announcement.findAll({
    order: [["createdAt", "DESC"]],
    limit: 20
  })

  res.json(announcements)
}

