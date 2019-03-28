'use strict';
const nodeMailer = require('nodemailer');


module.exports = function(req) {
  let body_html;
  if (!req.user.firstname) {
    body_html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Thoughtline Invite</title>
      </head>
      <body
        style="width: 100%;height: 100vh;text-align: center;font-family: Verdana, Geneva, Tahoma, sans-serif;"
      >
        <div id="title-div" style="margin-top: 10px;">
          <img
            src=${req.user.picture}
            id="friend-image"
            style="width: 150px;"
          />
          <img
            id="logo"
            src="https://s3-us-west-2.amazonaws.com/thoughtline/notification+(1).png"
            alt="Thoughtline logo"
            style="width: 150px;padding-bottom: 100px;"
          />
        </div>
        <div id="invite" style="margin: 0 40px;">
          <h2>
            <span class="highlight" style="color: blue;">${
              req.user.username
            }</span> wants you to
            join
            <span
              class="logo-text highlight"
              style="font-style: italic;color: blue;"
              >Thoughtline</span
            >
            so they can send you their thoughts!
          </h2>
          <br />
          <h3>
            Click below to create a free account and view
            <span class="highlight" style="color: blue;">${
              req.user.username
            }'s</span> thoughts about you:
          </h3>
          <a href="https://www.thoughtline.net">
            <button
              style="outline: none;color: white;margin-bottom: 50px;background: #0058cf;width: 200px;height: 65px;border-radius: 25px;font-size: 15px;"
            >
              Go to <em>Thoughtline</em>
            </button>
          </a>
        </div>
      </body>
    </html>
  `;
  }
  if (req.user.firstname) {
    body_html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Thoughtline Invite</title>
      </head>
      <body
        style="width: 100%;height: 100vh;text-align: center;font-family: Verdana, Geneva, Tahoma, sans-serif;"
      >
        <div id="title-div" style="margin-top: 10px;">
          <img
            src=${req.user.picture}
            id="friend-image"
            style="width: 150px;"
          />
          <img
            id="logo"
            src="https://s3-us-west-2.amazonaws.com/thoughtline/notification+(1).png"
            alt="Thoughtline logo"
            style="width: 150px;padding-bottom: 100px;"
          />
        </div>
        <div id="invite" style="margin: 0 40px;">
          <h2>
            <span class="highlight" style="color: blue;">${
              req.user.firstname
            } ${req.user.lastname}</span> wants you to
            join
            <span
              class="logo-text highlight"
              style="font-style: italic;color: blue;"
              >Thoughtline</span
            >
            so they can send you their thoughts!
          </h2>           
        <br />
          <h3>
          Click below to create a free account and view
          <span class="highlight" style="color: blue;">${
            req.user.firstname
          }'s</span> thoughts about you:
        </h3>
        <br>
          <a href="https://www.thoughtline.net">
            <button
              style="outline: none;color: white;margin-bottom: 50px;background: #0058cf;width: 200px;height: 65px;border-radius: 25px;font-size: 15px;"
            >
              Go to <em>Thoughtline</em>
            </button>
          </a>
        </div>
      </body>
    </html>`;
  }

  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  let mailOptions = {
    from: '"Friends at Thoughtline" <thoughtline2019@gmail.com>', // sender address
    to: req.body.email, // list of receivers
    subject: `Your friend ${req.user.firstname} ${
      req.user.lastname
    } wants to send you a personal thought on Thoughtline!`, // Subject line
    text: `Your friend ${req.user.firstname} ${req.user.lastname} wants to share thoughts with you on Thoughtline.
            Please go to www.thoughtline.net to set up a free account.`, // plain text body
    html: body_html, // html body
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, data) =>
      err ? reject(err) : resolve(data)
    );
  });
};
