require('dotenv').config();
const nodemailer = require('nodemailer');

const sendClientLoginEmail = async (clientEmail, clientName, loginUrl) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Portora" <${process.env.EMAIL_USER}>`,
    to: clientEmail,
    subject: 'Your Client Portal Login',
    html: `
      <p>Hi ${clientName},</p>
      <p>Your client portal is ready. Click below to log in:</p>
      <p><a href="${loginUrl}">${loginUrl}</a></p>
      <p>This link is valid for 7 days.</p>
      <p>– The Portora Team</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Login email sent to ${clientEmail}`);
  } catch (err) {
    console.error('Failed to send email:', err);
  }
};

module.exports = sendClientLoginEmail;
