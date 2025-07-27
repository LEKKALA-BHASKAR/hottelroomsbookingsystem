const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendBookingConfirmation = async (to, userName, roomNo) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Booking Confirmed!',
    html: `
      <h3>Hi ${userName},</h3>
      <p>Your booking for <strong>Room No. ${roomNo}</strong> has been <strong>confirmed</strong>.</p>
      <p>Thank you for choosing our hotel.</p>
      <br/>
      <p>– Hotel Booking System</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to", to);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

module.exports = sendBookingConfirmation;
