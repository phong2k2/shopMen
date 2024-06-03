const { createTransporter } = require("../../configs/email");
const { env } = require("../../configs/environment");

const sendEmail = async (to, subject, options) => {
  try {
    const msg = { from: env.USER_EMAIL, to, subject, ...options };
    const transport = await createTransporter();
    await transport.sendMail(msg);
  } catch (error) {
    throw error;
  }
};

const sendVerificationEmail = async (to, token) => {
  try {
    const subject = "Email Verification";
    const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        p {
          margin: 0;
        }
        .container {
          height: 100vh;
          font-family: 'system-ui';
        }
        .wrapper {
          border: 1px solid #e8e8e8;
          border-radius: 10px;
        }
        .wrapper-header {
          padding: 20px;
          border-bottom: 1px solid #e8e8e8;
        }
        .wrapper-header > img{
          scale: 1.2;
          width: 105px;
          height: 70px;
          display: inline;
          object-fit: cover;
        }
        .name-website {
          display: inline;
          margin-top: 18px;
          font-size: 50px;
          font-weight: 700;
          font-family: sans-serif;
        }
        .title {
          height: 100px;
          background-color: #4084f4;
          position: relative;
          border-top-right-radius: 10px;
          border-top-left-radius: 10px;
        }
        .title h2 {
          margin: 0;
          position: absolute;
          bottom: 20px;
          font-size: 25px;
          left: 20px;
          color: white;
        }
        .content {
          padding: 20px;
        }
        .text-red {
          color: #e32727
        }
        .text-13 {
          font-size: 13px;
        }
        .wrapper-code {
          padding: 10px;
          margin: 20px 0;
          text-align: center;
        }
        .wrapper-code > span {
          padding: 20px 40px;
          border-radius: 22px;
          background: rgb(240, 248, 255);
        }
        .code {
          text-align: center;
          font-size: 24px;
          font-weight: bold;
        }
        .notfi {
          margin: 10px 0;
          line-height: 1.4;
        }
        .footer {
          padding: 20px;
          color: white;
          background-color: #333;
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="wrapper">
          <div class="wrapper-header">
            <img src="https://rose-petals.vercel.app/static/media/logo.524255663532c9a4ccb7.png" style="display: inline;" />
            <div class="name-website">
              <span>ROSE PETAL</span>
            </div>
          </div>
          <div class="content">
            <p class="text-13 text-red">Please check the authentication number.</p>
            <div class="notfi">
              <p class="text-13">
                Hello. We will send you the required authentication number to verify your identity.
              </p>
              <p class="text-13">
                Please enter the 6-digit verification number below.
              </p>
            </div>
            <div class="wrapper-code">
              <span class="code">${token}</span>
            </div>
          </div>
          <div class="footer text-13">
            <div style="margin-bottom: 15px;">
              <p style="margin-bottom: 10px;">Contact:</p>
              <div style="margin-left: 20px;">
                <p style="margin-bottom: 5px;">Email: ducphong252002@gmail.com</p>
                <p>Tel: 03-7483-8098</p>
              </div>
            </div>

            <p>Copyright © 2024 Men's Fashion Inc. All rights reserved</p>
          </div>
        </div>
      </div>
    </body>
  </html>`;

    await sendEmail(to, subject, { html });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
  sendEmail,
};
