const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth")
const role = require("../middleware/role")

const podcastController = require("../controllers/podcast.controller")

// ================= CREATIVE =================

// Get all podcasts (draft + recording + completed)
router.get(
  "/creative/podcasts",
  auth,
  role("creative"),
  podcastController.getAllPodcastsCreative
)

// Create podcast (draft)
router.post(
  "/creative/podcasts",
  auth,
  role("creative"),
  podcastController.createPodcast
)

// Edit podcast anytime
router.put(
  "/creative/podcasts/:id",
  auth,
  role("creative"),
  podcastController.updatePodcast
)

// Delete podcast anytime
router.delete(
  "/creative/podcasts/:id",
  auth,
  role("creative"),
  podcastController.deletePodcast
)

// Mark podcast for recording (same as live script)
router.patch(
  "/creative/podcasts/:id/recording",
  auth,
  role("creative"),
  podcastController.markForRecording
)

// ================= RJ =================

// Get podcast marked for recording (same for all RJs)
router.get(
  "/rj/podcast",
  auth,
  role("rj"),
  podcastController.getPodcastForRJ
)

// Mark podcast completed
router.patch(
  "/rj/podcast/:id/complete",
  auth,
  role("rj"),
  podcastController.markPodcastCompleted
)

// ================= PUBLIC =================

// Optional: expose currently recording podcast (if needed later)
router.get(
  "/public/podcast/recording",
  podcastController.getPodcastForRJ
)

module.exports = router
