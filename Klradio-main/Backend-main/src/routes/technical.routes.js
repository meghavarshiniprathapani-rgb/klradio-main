const express = require("express")
const auth = require("../middleware/auth")
const role = require("../middleware/role")
const { getLiveScript } = require("../controllers/script.controller")
const {
  getSuggestions,
  deleteSuggestion,
  deleteMultipleSuggestions
} = require("../controllers/song.controller")

const router = express.Router()

router.use(auth, role("technical"))

router.get("/live-script", getLiveScript)

router.get("/song-suggestions", getSuggestions)

// ✅ Bulk delete (used by frontend checkbox delete)
router.delete("/song-suggestions", deleteMultipleSuggestions)

// ✅ Single delete (optional / legacy)
router.delete("/song-suggestions/:id", deleteSuggestion)

module.exports = router
