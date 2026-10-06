const express = require("express")
const auth = require("../middleware/auth")
const role = require("../middleware/role")
const controller = require("../controllers/stationhead.controller")

const router = express.Router()

router.use(auth, role(["station_head"]))

router.get("/users", controller.getAllUsers)
router.delete("/users/:id", controller.deleteUser)

router.get("/scripts", controller.getAllScripts)
router.patch("/scripts/:id/live", controller.setLiveScript)

router.get("/announcements", controller.getAllAnnouncements)

router.get("/news", controller.getAllNews)
router.patch("/news/:id/live", controller.setLiveNews)

router.get("/podcasts", controller.getAllPodcasts)
router.patch("/podcasts/:id/live", controller.setLivePodcast)

router.get("/song-suggestions", controller.getSongSuggestions)
router.delete("/song-suggestions", controller.bulkDeleteSongSuggestions)

module.exports = router
