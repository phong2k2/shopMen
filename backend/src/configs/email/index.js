const nodemailer = require("nodemailer");
const { env } = require("../environment");

async function createTransporter() {
  const transport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    // secure: true,
    auth: {
      user: env.SMTP_USERNAME,
      pass: env.SMTP_PASSWORD,
    },
  });

  try {
    await transport.verify();
    console.log("Server is ready to take our messages");
    return transport;
  } catch (error) {
    console.error("Error verifying transporter: ", error);
  }
}

module.exports = { createTransporter };
