const User = require("../models/User")

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "role", "createdAt"]
    })
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user) return res.status(404).json({ message: "User not found" })

    await user.destroy()
    res.json({ message: "User deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" })
  }
}
