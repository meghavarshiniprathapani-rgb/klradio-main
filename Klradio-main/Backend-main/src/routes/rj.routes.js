const express = require("express")
const auth = require("../middleware/auth")
const role = require("../middleware/role")

const scriptController = require("../controllers/script.controller")
const podcastController = require("../controllers/podcast.controller")
const announcementController = require("../controllers/announcement.controller")
const newsController = require("../controllers/news.controller")

const router = express.Router()

router.use(auth, role("rj"))

router.get("/live-script", scriptController.getLiveScript)

router.get("/podcast", podcastController.getPodcastForRJ)
router.patch("/podcast/:id/complete", podcastController.markPodcastCompleted)

router.get("/news", newsController.getAllNews)
router.get("/announcements", announcementController.getAnnouncements)

module.exports = router
