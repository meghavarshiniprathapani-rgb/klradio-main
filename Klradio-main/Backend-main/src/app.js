const express = require("express")
const cors = require("cors")

const authRoutes = require("./routes/auth.routes")
const creativeRoutes = require("./routes/creative.routes")
const rjRoutes = require("./routes/rj.routes")
const technicalRoutes = require("./routes/technical.routes")
const publicRoutes = require("./routes/public.routes")
const podcastRoutes = require("./routes/podcast.routes")
const stationHeadRoutes = require("./routes/stationhead.routes")

const app = express()

// ---------- GLOBAL MIDDLEWARE ----------
app.use(cors())
app.use(express.json())

// ---------- ROUTES ----------
app.use("/api/auth", authRoutes)
app.use("/api/creative", creativeRoutes)
app.use("/api/rj", rjRoutes)
app.use("/api/technical", technicalRoutes)
app.use("/api/public", publicRoutes)
app.use("/api", podcastRoutes)
app.use("/api/admin", stationHeadRoutes)

module.exports = app
