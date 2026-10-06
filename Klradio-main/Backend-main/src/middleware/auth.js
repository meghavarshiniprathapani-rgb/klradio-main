const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  const header = req.headers.authorization

  if (!header) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const parts = header.split(" ")
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const token = parts[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = {
      id: decoded.id,
      role: decoded.role
    }
    next()
  } catch {
    res.status(401).json({ message: "Invalid token" })
  }
}
