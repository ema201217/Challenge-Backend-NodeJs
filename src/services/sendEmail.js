const { createTransport } = require("nodemailer");

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

transporter.verify().then(() => {
  console.log("Ready for send emails");
});

module.exports = { transporter };
