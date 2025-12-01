const amqp = require('amqplib');
//const crypto = require('crypto'); bch ta3mll chda5lou 



async function sendResetEmail(email,token) {
  try {
    //const resetToken = crypto.randomBytes(32).toString('hex'); yrlllzem nafs el llink token 3la t3awed t generih
    const resetLink = `http://localhost:3000/reset-password/${token}`;

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'email_queue';
    await channel.assertQueue(queue, { durable: true });

    const message = JSON.stringify({ email, resetLink });
    channel.sendToQueue(queue, Buffer.from(message), { persistent: true });

    console.log(`📤 Published reset email job for: ${email}`);

    await channel.close();
    await connection.close();

    // Return the token so we can save it in DB
    return resetLink;

  } catch (error) {
    console.error('Error publishing to RabbitMQ:', error);
    throw error;
  }
}

module.exports = { sendResetEmail };