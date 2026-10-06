const PodcastScript = require("../models/PodcastScript")

exports.createPodcast = async (req, res) => {
  const { title, topic, content } = req.body

  const podcast = await PodcastScript.create({
    title,
    topic,
    content,
    status: "draft"
  })

  res.status(201).json(podcast)
}

exports.getAllPodcastsCreative = async (req, res) => {
  const podcasts = await PodcastScript.findAll({
    order: [["createdAt", "DESC"]]
  })

  res.json(podcasts)
}

exports.markForRecording = async (req, res) => {
  const { id } = req.params

  const podcast = await PodcastScript.findByPk(id)
  if (!podcast) return res.status(404).json({ message: "Podcast not found" })

  podcast.status = "recording"
  await podcast.save()

  res.json(podcast)
}

exports.updatePodcast = async (req, res) => {
  const { id } = req.params

  const podcast = await PodcastScript.findByPk(id)
  if (!podcast) return res.status(404).json({ message: "Podcast not found" })

  const { title, topic, content } = req.body

  podcast.title = title ?? podcast.title
  podcast.topic = topic ?? podcast.topic
  podcast.content = content ?? podcast.content

  await podcast.save()
  res.json(podcast)
}

exports.deletePodcast = async (req, res) => {
  const { id } = req.params

  const podcast = await PodcastScript.findByPk(id)
  if (!podcast) return res.status(404).json({ message: "Podcast not found" })

  await podcast.destroy()
  res.json({ message: "Podcast deleted" })
}

exports.getPodcastForRJ = async (req, res) => {
  const podcast = await PodcastScript.findOne({
    where: { status: "recording" },
    order: [["updatedAt", "DESC"]]
  })

  res.json(podcast)
}

exports.markPodcastCompleted = async (req, res) => {
  const { id } = req.params

  const podcast = await PodcastScript.findByPk(id)
  if (!podcast) return res.status(404).json({ message: "Podcast not found" })

  if (podcast.status !== "recording") {
    return res.status(400).json({ message: "Podcast not in recording state" })
  }

  podcast.status = "completed"
  await podcast.save()

  res.json(podcast)
}
