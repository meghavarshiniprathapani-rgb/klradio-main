const express = require("express")
const auth = require("../middleware/auth")
const role = require("../middleware/role")
const {
  createNews,
  getAllNews,
  updateNews,
  deleteNews
} = require("../controllers/news.controller")

const router = express.Router()

router.use(auth, role(["creative"]))

router.post("/", createNews)
router.get("/", getAllNews)
router.put("/:id", updateNews)
router.delete("/:id", deleteNews)

module.exports = router
