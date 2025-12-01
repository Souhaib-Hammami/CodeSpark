const bcrypt = require('bcrypt');
const crypto = require('crypto');
const {users} = require('../models');
const { sendResetEmail } = require('../rabbitMQ/publisher');


const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate secure random token
    const token = crypto.randomBytes(48).toString('hex');
console.log(`Reset link from forget: http://localhost:3000/reset-password/${token}`);

    // Save token + expiry (15 minutes)
    user.resetToken = token;
    user.tokenExpiry = Date.now() + 1000 * 60 * 15;
    await user.save();

    // Send to RabbitMQ (email queue)
    await sendResetEmail(email, token);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};


const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    console.log(`Reset link from reset: http://localhost:3000/reset-password/${token}`);

    const user = await users.findOne({ where: { resetToken: token } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    if (Date.now() > new Date(user.tokenExpiry).getTime()) {
      return res.status(400).json({ error: 'Token has expired' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password_hash = hashedPassword;
    user.resetToken = null;
    user.tokenExpiry = null;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports={forgotPassword,resetPassword}
