const { users } = require('../models');
const bcrypt = require('bcrypt'); 

const register = async (req, res) => {
  try {
    const { username, email, password_hash } = req.body;

    if (!username || !email || !password_hash) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({ error: "Username must be between 3 and 20 characters." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    if (password_hash.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long." });
    }

    //  mawJoud ou nn 
    const existingUser = await users.findOne({
      where: { email },
    });


    if (existingUser) {
      return res.status(409).json({ error: "Email already in use." });
    }

    const existingUsername = await users.findOne({
      where: { username },
    });


    if (existingUsername) {
      return res.status(409).json({ error: "Username already taken." });
    }



    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password_hash, salt);

    // === Create new user ===
    const newUser = await users.create({
      username,
      email,
      password_hash: hashedPassword,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = register;
