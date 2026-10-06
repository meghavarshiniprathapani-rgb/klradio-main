const express = require("express")
const { getPublicAnnouncements } = require("../controllers/announcement.controller")
const { submitSuggestion } = require("../controllers/song.controller")

const router = express.Router()

router.get("/announcements", getPublicAnnouncements)
router.post("/song-suggestion", submitSuggestion)

module.exports = router
