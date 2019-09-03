'use strict';
const nodeMailer = require('nodemailer');


module.exports = function(email, username) {
  
  let body_html;
  
  body_html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Thoughtline Username</title>
      </head>
      <body
        style="width: 100%;height: 100vh;text-align: center;font-family: Verdana, Geneva, Tahoma, sans-serif;"
      >
        <div id="title-div" style="margin-top: 10px;">
          
          <img
            id="logo"
            src="https://s3-us-west-2.amazonaws.com/thoughtline/notification+(1).png"
            alt="Thoughtline logo"
            style="width: 150px;padding-bottom: 100px;"
          />
        </div>
        <div id="reset" style="margin: 0 40px;">
          <p>You have requested an email with your Thoughtline username.
          <h2>
            Your requested username : ${username}.
          </h2>
          <br />
          
          <a href="https://www.thoughtline.net/">
            Thoughtline
          </a>
        </div>
      </body>
    </html>
  `;
  
  

  // send grid smtp sending.
  let transporter = nodeMailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDGRIDUSERNAME,
      pass: process.env.SENDGRIDKEY,
    },
  });
  let mailOptions = {
    from: '"Friends at Thoughtline" <thoughtline2019@gmail.com>', // sender address
    to: email, // list of receivers
    subject: `Username request`, // Subject line
    text: `Your username is ${username}`, // plain text body
    html: body_html, // html body
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, data) =>
      err ? reject(err) : resolve(data)
    );
  });
};
