const amqp = require('amqplib');
const nodemailer = require('nodemailer');
async function startConsumer() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queue = 'email_queue';
  await channel.assertQueue(queue, { durable: true });

  console.log('📨 Waiting for messages in email_queue...');

  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      const { email, resetLink } = JSON.parse(msg.content.toString());
      console.log(`📩 Sending reset email to: ${email}`);

      await sendEmail(email, resetLink);
      channel.ack(msg);
    }
  });
}

async function sendEmail(email, resetLink) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'souhaibshark@gmail.com',        // Replace with your email
      pass: 'chknvemfjkdhojbt',           // Use Gmail App Password, not your real password
    },
  });

  const mailOptions = {
    from: 'Code⚡Spark <souhaibshark@gmail.com>',
    to: email,
    subject: 'Reset Your Password',
    html: `<p>You requested a password reset.</p>
           <p><a href="${resetLink}">Click here to reset your password ..</a></p>`,
  };

  await transporter.sendMail(mailOptions);
  console.log(`✅ Reset email sent to ${email}`);
}

startConsumer().catch(console.error);
