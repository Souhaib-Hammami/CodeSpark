const { users } = require("../models");
const bcrypt = require("bcryptjs"); 

const updateUserInfo = async (req, res) => {
  try {
    const { userId, username, email, bio, password_hash } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (bio !== undefined) user.bio = bio;
  
  ////////////////////
    if (password_hash) user.password_hash = password_hash
 //////////or with bcrypt////////////:   
    // if (password_hash) {
    //   const salt = await bcrypt.genSalt(10);
    //   user.password_hash = await bcrypt.hash(password_hash, salt);
    // }

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

module.exports = updateUserInfo;
