const express = require("express")
const auth = require("../middleware/auth")
const role = require("../middleware/role")
const {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
  getPublicAnnouncements
} = require("../controllers/announcement.controller")

const router = express.Router()

router.post(
  "/creative/announcements",
  auth,
  role(["creative"]),
  createAnnouncement
)

router.get(
  "/creative/announcements",
  auth,
  role(["creative"]),
  getAnnouncements
)

router.put(
  "/creative/announcements/:id",
  auth,
  role(["creative"]),
  updateAnnouncement
)

router.delete(
  "/creative/announcements/:id",
  auth,
  role(["creative"]),
  deleteAnnouncement
)

router.get(
  "/rj/announcements",
  auth,
  role(["rj"]),
  getAnnouncements
)

router.get(
  "/public/announcements",
  getPublicAnnouncements
)

module.exports = router
